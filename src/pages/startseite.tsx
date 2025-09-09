// src/pages/Startseite.tsx
import { useState, useEffect } from "react";
import { Container, Title, Stack, Text, Loader, Center } from "@mantine/core";
import Header from "../components/GBTHeader"
import Hero from "../components/HeroBullets";
import Carousel from "../components/CardsCorousel";
import TermineListe from "../components/TermineListe";
import Kontaktformular from "../components/Kontaktformular";
import Footer from "../components/FooterSocial";
import FAQ from "../components/FaqSimple";
import UeberUns from "../components/UeberUns";
import Mitmachen from "../components/Mitmachen";

// Deine API-URL


const API = 'https://script.google.com/macros/s/AKfycbz8_KeA1-PjWUey4dtJgeVZ7NKidhqUl6iNzS1WmmgKdzUP5t0vcUfj7dTTbxhnejb9/exec';

export default function Startseite() {
    const [events, setEvents] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const [eventsRes,] = await Promise.all([
                    fetch(`${API}?route=events&ts=${Date.now()}`),
                ]);

                if (!eventsRes.ok) throw new Error(`Events HTTP Fehler ${eventsRes.status}`);
                const eventsData = await eventsRes.json();

                console.log("angekommende Daten:", eventsData);


                // Events ins passende Format bringen
                const mappedEvents = eventsData.map((ev: any) => ({
                    event_id: ev.id,
                    datum: ev.datum
                        ? new Date(ev.datum).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" })
                        : "",
                    uhrzeit: ev.uhrzeit
                        ? new Date(ev.uhrzeit).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
                        : "",
                    ort: ev.ort,
                    adresse: ev.adresse,
                    kneipe: ev.kneipe,
                    max_teams: ev.max_teams,
                    dauergaeste_teams: ev.dauergaeste_teams,
                    neu_angemeldet_teams: ev.neu_angemeldet_teams,
                    thema: ev.beschreibung,
                    preis_pro_person: ev.preisproperson ?? null,
                    freieTeams: ev.max_teams - (ev.dauergaeste_teams + ev.neu_angemeldet_teams),
                    bild_url: ev.bild_url,
                    website_url: ev.website_url,
                }));

                setEvents(mappedEvents);
                // hier könntest du auch z. B. setTeams(teamsData) und setRegistrations(registrationsData) machen
                console.log("Events:", mappedEvents);

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
                {loading && <Center><Loader /></Center>}
                {error && <Text c="red">{error}</Text>}
                {events && <TermineListe termine={events} />}

                <Title id="standorte">Standorte:</Title>
                {events && <Carousel events={events} />}

                <Title id="ueberuns"></Title>
                <UeberUns />

                <Title id="faq"></Title>
                <FAQ />

                <Title id="kontakt"></Title>
                <Kontaktformular />

                <Footer />
            </Stack>
        </Container>
    );
}
