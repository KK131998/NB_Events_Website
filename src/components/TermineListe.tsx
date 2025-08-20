// src/components/TermineListe.tsx
import {
    Card, Badge, Text, Button, SimpleGrid, Modal, Stack, Group,
    NumberInput, TextInput, Select, Divider, Alert
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

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

const API = 'https://script.google.com/macros/s/AKfycbw6DxwGKi0IrXa6cVaCbxzsHF3f_Yd4MislibP-uD7AdywxwD4YEDu_iBC4Llfuw-Sk/exec';

export default function TermineListe({ termine }: { termine: Termin[] }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [sel, setSel] = useState<Termin | null>(null);

    const [teamname, setTeamname] = useState("");
    const [anzahl, setAnzahl] = useState<number | ''>(2);
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [zahlweise, setZahlweise] = useState<string | null>("Bar vor Ort");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [ok, setOk] = useState(false);

    const resetForm = () => {
        setTeamname(""); setAnzahl(2); setEmail(""); setZahlweise("Bar vor Ort");
        setTelefon("");                // ⬅️ neu
        setErr(null); setOk(false);
    };

    async function submit() {
        if (!sel) return;

        // Falls event_id fehlt: Mapping in Startseite.tsx prüfen (event_id: ev.id)
        if (!sel.event_id) {
            setErr("Fehler: event_id fehlt. Bitte Mapping in Startseite.tsx ergänzen.");
            return;
        }

        setLoading(true);
        setErr(null);
        setOk(false);

        try {
            // ✅ FormData statt JSON – KEINE eigenen Header setzen
            const form = new FormData();
            form.append("route", "register");
            form.append("event_id", sel.event_id);
            form.append("anzahl_personen", String(anzahl));
            form.append("bezahlt", "nein"); // oder "true" wenn bezahlt
            form.append("team_name", teamname.trim());
            form.append("kontakt_email", email.trim());
            if (telefon.trim()) form.append("telefon", telefon.trim());
            if (zahlweise) form.append("zahlweise", zahlweise);

            // optional, hilfreich beim Debuggen im Sheet:
            // form.append("source", "nb-events-frontend");

            const res = await fetch(API, { method: "POST", body: form }); // keine headers!
            // Manche Apps‑Script-Fehler kommen mit 200 zurück – immer JSON prüfen:
            let json: any = {};
            try { json = await res.json(); } catch { /* falls kein JSON zurückkommt */ }

            if (!res.ok || json?.error || json?.ok === false) {
                const msg = json?.error || `HTTP ${res.status}`;
                throw new Error(msg);
            }

            // ✅ Erfolg
            setOk(true);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

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
                            placeholder="Die Quizraketen"
                            required
                            value={teamname}
                            onChange={(e) => setTeamname(e.currentTarget.value)}
                        />
                        <NumberInput
                            label="Anzahl Personen"
                            min={3} max={10}
                            value={anzahl}
                            onChange={(val) => {
                                if (val === '' || val === null || val === undefined) {
                                    setAnzahl('');
                                    return;
                                }
                                const num = typeof val === 'number' ? val : parseInt(val, 10);
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

                        {err && <Alert color="red">{err}</Alert>}
                        {ok && <Alert color="green">Reservierung eingegangen! Nikki bestätigt per E-Mail.</Alert>}

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
