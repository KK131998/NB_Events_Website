// src/components/TermineListe.tsx
import {
    Card, Badge, Text, Button, SimpleGrid, Modal, Stack, Group,
    NumberInput, TextInput, Select, Divider, Alert
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react"; // ⬅️ useEffect/useMemo

export type Termin = {
    event_id: string;
    datum: string;
    uhrzeit: string;
    kneipe: string;
    ort: string;
    adresse?: string;
    thema?: string;
    preis_pro_person?: number | null;
    freieTeams?: number;
};

const API = 'https://script.google.com/macros/s/AKfycbz8_KeA1-PjWUey4dtJgeVZ7NKidhqUl6iNzS1WmmgKdzUP5t0vcUfj7dTTbxhnejb9/exec';


export default function TermineListe({ termine }: { termine: Termin[] }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [sel, setSel] = useState<Termin | null>(null);

    const [teamname, setTeamname] = useState("");
    const [anzahl, setAnzahl] = useState<number | ''>(3);
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [zahlweise, setZahlweise] = useState<string | null>("Bar vor Ort");
    const [preisGesamt, setPreisGesamt] = useState<number | ''>(0);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [ok, setOk] = useState(false);

    const resetForm = () => {
        setTeamname("");
        setAnzahl(3);                    // konsistent zu Default
        setEmail("");
        setZahlweise("Bar vor Ort");
        setTelefon("");
        setErr(null);
        setOk(false);
    };

    // hübsches Euro-Format
    const eur = useMemo(
        () => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
        []
    );

    // 🔢 Gesamtpreis live berechnen sobald Termin oder Anzahl ändern
    useEffect(() => {
        if (sel && typeof sel.preis_pro_person === "number" && typeof anzahl === "number") {
            setPreisGesamt(sel.preis_pro_person * anzahl);
        } else {
            setPreisGesamt('');
        }
    }, [sel, anzahl]);


    async function submit() {
        if (!sel) return;
        if (!sel.event_id) {
            setErr("Fehler: event_id fehlt. Bitte Mapping in Startseite.tsx ergänzen.");
            return;
        }

        setLoading(true);
        setErr(null);
        setOk(false);

        try {
            const form = new FormData();
            form.append("route", "register");
            form.append("event_id", sel.event_id);
            form.append("anzahl_personen", String(anzahl));
            form.append("bezahlt", "nein");
            form.append("team_name", teamname.trim());
            form.append("kontakt_email", email.trim());
            if (telefon.trim()) form.append("telefon", telefon.trim());
            if (zahlweise) form.append("zahlweise", zahlweise);
            if (typeof preisGesamt === "number") {
                form.append("betrag_gesamt", String(preisGesamt)); // ⬅️ optional fürs Sheet
            }
            const res = await fetch(API, { method: "POST", body: form });
            let json: any = {};
            try { json = await res.json(); } catch { }

            if (!res.ok || json?.error || json?.ok === false) {
                const msg = json?.error || `HTTP ${res.status}`;
                throw new Error(msg);
            }

            setOk(true);
            setTimeout(() => { window.location.reload(); }, 1000);
        } catch (e: any) {
            setErr(e?.message || "Senden fehlgeschlagen.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                {termine.map((t, i) => {
                    const ausverkauft = (t.freieTeams ?? 0) <= 0;
                    return (
                        <Card key={`${t.datum}-${t.kneipe}-${i}`} withBorder radius="md" padding="lg">
                            <Badge variant="light">{t.datum} · {t.uhrzeit} Uhr</Badge>
                            <Text fw={600} mt="sm">{t.kneipe}</Text>
                            <Text c="dimmed" size="sm">{t.ort}</Text>
                            {t.thema && <Text size="sm" mt="xs">{t.thema}</Text>}
                            <Text size="sm" mt="xs">Preis pro Person: {t.preis_pro_person} €</Text>
                            {typeof t.freieTeams === 'number' &&
                                <Badge mt="xs" color={ausverkauft ? "red" : "teal"}>
                                    {ausverkauft ? "Ausverkauft" : `${t.freieTeams} Plätze frei`}
                                </Badge>}
                            <Button
                                mt="md"
                                variant="light"
                                disabled={ausverkauft}
                                onClick={() => { setSel(t); resetForm(); open(); }}
                            >
                                {ausverkauft ? "Ausverkauft" : "Jetzt anmelden"}
                            </Button>
                        </Card>
                    );
                })}
            </SimpleGrid>

            <Modal opened={opened} onClose={close} title="Team reservieren" centered>
                {sel && (
                    <Stack>
                        <Text fw={600}>{sel.kneipe}</Text>
                        <Text size="sm" c="dimmed">
                            {sel.datum} · {sel.uhrzeit} Uhr — {sel.adresse || sel.ort}
                        </Text>
                        <Divider />

                        <TextInput
                            label="Teamname"
                            required
                            value={teamname}
                            onChange={(e) => setTeamname(e.currentTarget.value)}
                        />
                        <NumberInput
                            label="Anzahl Personen"
                            min={3} max={7}
                            value={anzahl}
                            onChange={(val) => {
                                if (val === '' || val === null || val === undefined) {
                                    setAnzahl('');
                                    return;
                                }
                                const num = typeof val === 'number' ? val : parseInt(val as any, 10);
                                setAnzahl(Number.isNaN(num) ? '' : num);
                            }}
                        />
                        <TextInput
                            label="Kontakt E-Mail"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                        <TextInput
                            label="Telefon (optional)"
                            placeholder="+49 160 1234567"
                            type="tel"
                            inputMode="tel"
                            value={telefon}
                            onChange={(e) => setTelefon(e.currentTarget.value)}
                        />
                        <Select
                            label="Zahlweise"
                            data={["Bar vor Ort"]}
                            value={zahlweise}
                            onChange={setZahlweise}
                            required
                        />

                        {/* 💶 gut sichtbare Preis-Zusammenfassung */}
                        {typeof sel.preis_pro_person === "number" && typeof anzahl === "number" && (
                            <Alert color="blue" variant="light" mt="md">
                                Gesamtpreis: <strong>{eur.format(sel.preis_pro_person * anzahl)}</strong>{" "}
                                ({anzahl} × {eur.format(sel.preis_pro_person)})
                            </Alert>
                        )}

                        {err && <Alert color="red">{err}</Alert>}
                        {ok && <Alert color="green">Reservierung eingegangen! Wir bestätigen per E-Mail.</Alert>}

                        <Group justify="flex-end" mt="sm">
                            <Button variant="default" onClick={close}>Schließen</Button>
                            <Button loading={loading} onClick={submit}>Reservieren</Button>
                        </Group>
                    </Stack>
                )}
            </Modal>
        </>
    );
}
