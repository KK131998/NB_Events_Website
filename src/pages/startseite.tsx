// src/pages/Startseite.tsx
import { useState, useEffect } from "react";
import { Container, Title, Stack, Text, Loader, Center } from "@mantine/core";
import Header from "../components/GBTHeader";
import Hero from "../components/HeroBullets";
import Carousel from "../components/CardsCorousel";
import TermineListe from "../components/TermineListe";
import Kontaktformular from "../components/Kontaktformular";
import Footer from "../components/FooterSocial";
import FAQ from "../components/FaqSimple";
import UeberUns from "../components/UeberUns";
import Mitmachen from "../components/Mitmachen";

// PocketBase Collections:
// 1. "kneipen"       → name, picture, address, city, website_url
// 2. "kneipenquizze" → datetime, price, picture, venue (relation zu kneipen)

const PB_URL = import.meta.env.VITE_PB_URL ?? "http://127.0.0.1:8090";

function buildPbFileUrl(
  collection: string,
  recordId: string,
  fileName?: string | null,
) {
  if (!fileName) return undefined;
  const base = PB_URL.replace(/\/+$/, "");
  return `${base}/api/files/${collection}/${recordId}/${encodeURIComponent(
    fileName,
  )}`;
}

export default function Startseite() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          `${PB_URL.replace(/\/+$/, "")}/api/collections/kneipenquizze/records?page=1&perPage=200&sort=datetime&expand=venue`,
        );

        if (!res.ok) {
          throw new Error(`Events HTTP Fehler ${res.status}`);
        }

        const data = await res.json();
        const items: any[] = data.items ?? data.records ?? [];

        const mappedEvents = items.map((ev: any) => {
          const dt = ev.datetime ? new Date(ev.datetime) : null;
          const timeLabel =
            typeof ev.datetime === "string"
              ? (ev.datetime.match(/(\d{2}:\d{2})/)?.[1] ?? "")
              : "";
          const venue = ev.expand?.venue;
          const venueRecord = Array.isArray(venue) ? venue[0] : venue;

          return {
            event_id: ev.id,
            datum: dt
              ? dt.toLocaleDateString("de-DE", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "",
            uhrzeit: timeLabel,
            ort: venueRecord?.city ?? "",
            adresse: venueRecord?.address ?? "",
            kneipe: venueRecord?.name ?? "",
            preis_pro_person: ev.price ?? null,
            bild_url:
              (buildPbFileUrl("kneipenquizze", ev.id, ev.picture) ??
              venueRecord?.picture)
                ? buildPbFileUrl("kneipen", venueRecord.id, venueRecord.picture)
                : undefined,
            website_url: venueRecord?.website_url ?? undefined,
          };
        });

        setEvents(mappedEvents);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Header />

        <Hero />

        <Title id="mitmachen"></Title>
        <Mitmachen />

        <Title id="anmeldung"></Title>
        {loading && (
          <Center>
            <Loader />
          </Center>
        )}
        {error && <Text c="red">{error}</Text>}
        {events && <TermineListe termine={events} />}

        {events && <Carousel events={events} />}

        <UeberUns />

        <FAQ />

        <Kontaktformular />

        <Footer />
      </Stack>
    </Container>
  );
}
