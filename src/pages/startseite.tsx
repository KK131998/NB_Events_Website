import { useState, useEffect } from "react";
import { Text, Loader, Center } from "@mantine/core";
import Header from "../components/GBTHeader";
import Hero from "../components/HeroBullets";
import Carousel from "../components/CardsCorousel";
import TermineListe from "../components/TermineListe";
import Footer from "../components/FooterSocial";
import FAQ from "../components/FaqSimple";
import UeberUns from "../components/UeberUns";
import Mitmachen from "../components/Mitmachen";

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
        const now = new Date();
        const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const filter = encodeURIComponent(`datetime >= "${todayKey} 00:00:00"`);
        const res = await fetch(
          `${PB_URL.replace(/\/+$/, "")}/api/collections/kneipenquizze/records?page=1&perPage=200&sort=datetime&expand=venue&filter=${filter}`,
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

          const eventPictureUrl = buildPbFileUrl(
            "kneipenquizze",
            ev.id,
            ev.picture,
          );
          const venuePictureUrl =
            venueRecord && venueRecord.picture
              ? buildPbFileUrl("kneipen", venueRecord.id, venueRecord.picture)
              : undefined;

          return {
            event_id: ev.id,
            event_datetime: ev.datetime ?? "",
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
            bild_url: eventPictureUrl,
            kneipen_bild_url: venuePictureUrl,
            website_url: venueRecord?.website_url ?? undefined,
            online_kaufbar: ev.online_kaufbar === true,
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
    <>
      <Header />
      <main>
        <Hero />

        <Mitmachen />

        {loading && (
          <Center py="xl">
            <Loader color="orange" />
          </Center>
        )}
        {error && (
          <Center>
            <Text c="red">{error}</Text>
          </Center>
        )}
        {events && <TermineListe termine={events} />}

        {events && <Carousel events={events} />}

        <UeberUns />

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
