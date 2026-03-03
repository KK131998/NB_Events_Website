// src/components/TermineListe.tsx
import {
  Alert,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import classes from "../styles/TermineListe.module.scss";

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
  tickets_online_reservierbar: string;
  bild_url?: string;
};

const API =
  "https://script.google.com/macros/s/AKfycbxkr-RVpzWCmmWLoA_ZmpA5SQen8us3rMRgyd3PhIsHnQ-l8IyJPxlRMeUMdqIetYFm/exec";

export default function TermineListe({ termine }: { termine: Termin[] }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [sel, setSel] = useState<Termin | null>(null);

  const [teamname, setTeamname] = useState("");
  const [anzahl, setAnzahl] = useState<number | "">(3);
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [zahlweise, setZahlweise] = useState<string | null>("Bar vor Ort");
  const [preisGesamt, setPreisGesamt] = useState<number | "">(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [overlayClosing, setOverlayClosing] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeImageOverlay = () => {
    if (closeTimeoutRef.current) return;
    setOverlayClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredImage(null);
      setOverlayClosing(false);
      closeTimeoutRef.current = null;
    }, 380);
  };

  const resetForm = () => {
    setTeamname("");
    setAnzahl(3);
    setEmail("");
    setZahlweise("Bar vor Ort");
    setTelefon("");
    setErr(null);
    setOk(false);
  };

  const eur = useMemo(
    () =>
      new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
    [],
  );

  useEffect(() => {
    if (
      sel &&
      typeof sel.preis_pro_person === "number" &&
      typeof anzahl === "number"
    ) {
      setPreisGesamt(sel.preis_pro_person * anzahl);
    } else {
      setPreisGesamt("");
    }
  }, [sel, anzahl]);

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    []
  );

  async function submit() {
    if (!sel) return;
    if (!sel.event_id) {
      setErr(
        "Fehler: event_id fehlt. Bitte Mapping in Startseite.tsx ergänzen.",
      );
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
        form.append("betrag_gesamt", String(preisGesamt));
      }
      const res = await fetch(API, { method: "POST", body: form });
      let json: any = {};
      try {
        json = await res.json();
      } catch {}

      if (!res.ok || json?.error || json?.ok === false) {
        const msg = json?.error || `HTTP ${res.status}`;
        throw new Error(msg);
      }

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
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text
            className={classes.eyebrow}
            size="sm"
            fw={600}
            tt="uppercase"
            lts={1}
          >
            Termine
          </Text>
          <Title order={2} className={classes.title}>
            Alle Quiz-Termine
          </Title>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} className={classes.grid}>
          {termine.map((t, i) => {
            const ausverkauft = (t.freieTeams ?? 0) <= 0;
            const online =
              !t.tickets_online_reservierbar ||
              t.tickets_online_reservierbar.toLowerCase() !== "nein";
            const base = import.meta.env.BASE_URL || "/";
            const imageSrc = `${base.replace(/\/?$/, "/")}quizzenswert.jpeg`;

            return (
              <Card
                key={`${t.datum}-${t.kneipe}-${i}`}
                className={classes.card}
                withBorder
                radius="lg"
                padding={0}
              >
                <div
                    className={`${classes.cardImageWrapper} ${classes.cardImageWrapperPoster} ${classes.cardImageHover}`}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = null;
                      }
                      setHoveredImage(imageSrc);
                    }}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = setTimeout(() => {
                        setHoveredImage(null);
                        hoverTimeoutRef.current = null;
                      }, 150);
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt={t.kneipe}
                      className={classes.cardImage}
                    />
                    <span className={classes.hoverHint}>Bild vergrößern</span>
                  </div>
                <div className={classes.cardContent}>
                  <Group justify="space-between" wrap="nowrap" mb="sm">
                    <Group gap="xs">
                      <IconCalendar size={18} className={classes.icon} />
                      <Text size="sm" fw={600}>
                        {t.datum} · {t.uhrzeit} Uhr
                      </Text>
                    </Group>
                  </Group>

                  <Text fw={600} size="lg" className={classes.kneipe}>
                    {t.kneipe}
                  </Text>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={14} className={classes.icon} />
                    <Text c="dimmed" size="sm">
                      {t.ort}
                      {t.adresse && `, ${t.adresse}`}
                    </Text>
                  </Group>
                  {t.thema && (
                    <Text size="sm" c="dimmed" mt="xs" fs="italic">
                      {t.thema}
                    </Text>
                  )}

                  {typeof t.preis_pro_person === "number" && (
                    <Text size="sm" fw={500} mt="sm">
                      {eur.format(t.preis_pro_person)} pro Person
                    </Text>
                  )}

                  <Button
                    mt="lg"
                    variant="filled"
                    color="orange"
                    fullWidth
                    disabled={ausverkauft || !online}
                    className={online && !ausverkauft ? classes.cta : undefined}
                    onClick={() => {
                      setSel(t);
                      resetForm();
                      open();
                    }}
                  >
                    {ausverkauft
                      ? "Ausverkauft"
                      : !online
                        ? "Tickets vor Ort"
                        : "Jetzt anmelden"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>

      {hoveredImage && (
        <div
          className={`${classes.imageOverlay} ${overlayClosing ? classes.imageOverlayClosing : ""}`}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }
          }}
          onMouseLeave={closeImageOverlay}
        >
          <img
            src={hoveredImage}
            alt="Vergrößerte Ansicht"
            className={`${classes.imageOverlayImg} ${overlayClosing ? classes.imageOverlayImgClosing : ""}`}
            onMouseLeave={closeImageOverlay}
          />
        </div>
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Team reservieren"
        centered
        size="md"
        radius="lg"
      >
        {sel && (
          <Stack gap="md">
            <div>
              <Text fw={600} size="lg">
                {sel.kneipe}
              </Text>
              <Text size="sm" c="dimmed">
                {sel.datum} · {sel.uhrzeit} Uhr — {sel.adresse || sel.ort}
              </Text>
            </div>
            <Divider />

            <TextInput
              label="Teamname"
              placeholder="z.B. Quizmaster"
              required
              value={teamname}
              onChange={(e) => setTeamname(e.currentTarget.value)}
            />
            <NumberInput
              label="Anzahl Personen"
              min={3}
              max={7}
              value={anzahl}
              placeholder="3"
              onChange={(val) => {
                if (val === "" || val === null || val === undefined) {
                  setAnzahl("");
                  return;
                }
                const num =
                  typeof val === "number" ? val : parseInt(val as string, 10);
                setAnzahl(Number.isNaN(num) ? "" : num);
              }}
            />
            <TextInput
              label="Kontakt E-Mail"
              type="email"
              placeholder="deine@email.de"
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

            {typeof sel.preis_pro_person === "number" &&
              typeof anzahl === "number" && (
                <Alert color="orange" variant="light" radius="md">
                  <Text size="sm">
                    Gesamtpreis:{" "}
                    <strong>{eur.format(sel.preis_pro_person * anzahl)}</strong>{" "}
                    ({anzahl} × {eur.format(sel.preis_pro_person)})
                  </Text>
                </Alert>
              )}

            {err && (
              <Alert color="red" variant="light">
                {err}
              </Alert>
            )}
            {ok && (
              <Alert color="green" variant="light">
                Reservierung eingegangen! Wir bestätigen per E-Mail.
              </Alert>
            )}

            <Group justify="flex-end" gap="sm" mt="xs">
              <Button variant="default" onClick={close}>
                Schließen
              </Button>
              <Button
                color="orange"
                loading={loading}
                onClick={submit}
                className={classes.cta}
              >
                Reservieren
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </section>
  );
}
