import { Carousel } from "@mantine/carousel";
import { Button, Container, Paper, Text, Title } from "@mantine/core";
import { useMemo } from "react";
import classes from "../styles/CardsCarousel.module.scss";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

interface CardProps {
  image: string;
  title: string;
  category: string;
  url: string;
}

function LocationCard({ image, title, category, url }: CardProps) {
  return (
    <Paper
      className={classes.card}
      radius="lg"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={classes.overlay} />
      <div className={classes.content}>
        <Text className={classes.category} size="sm">
          {category}
        </Text>
        <Title order={3} className={classes.cardTitle}>
          {title}
        </Title>
        <Button
          component="a"
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          disabled={!url}
          size="sm"
          radius="xl"
          className={classes.cta}
        >
          Zur Webseite
        </Button>
      </div>
    </Paper>
  );
}

export default function CardsCarousel({ events = [] }: { events: any[] }) {
  const slidesData = useMemo(() => {
    const seen = new Set<string>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parseEventDate = (value: unknown): Date | null => {
      if (typeof value !== "string" || !value.trim()) return null;

      // ISO oder ISO-ähnlich: 2026-04-11...
      const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (isoMatch) {
        const date = new Date(
          Number(isoMatch[1]),
          Number(isoMatch[2]) - 1,
          Number(isoMatch[3]),
        );
        date.setHours(0, 0, 0, 0);
        return Number.isNaN(date.getTime()) ? null : date;
      }

      // Deutsches Format: 11.04.2026...
      const deMatch = value.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
      if (deMatch) {
        const date = new Date(
          Number(deMatch[3]),
          Number(deMatch[2]) - 1,
          Number(deMatch[1]),
        );
        date.setHours(0, 0, 0, 0);
        return Number.isNaN(date.getTime()) ? null : date;
      }

      // Fallback auf Date-Parser
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return null;
      parsed.setHours(0, 0, 0, 0);
      return parsed;
    };

    return events
      .filter((ev: any) => {
        const eventDate = parseEventDate(ev.event_datetime);
        // Ohne Datum nicht filtern, damit Einträge nicht versehentlich verschwinden
        if (!eventDate) return true;
        return eventDate >= today;
      })
      .filter((ev: any) => {
        const id = `${ev.kneipe ?? ""}-${ev.ort ?? ""}`;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((ev: any, i: number) => {
        const base = import.meta.env.BASE_URL || "/";
        const fallbackSrc = `${base.replace(/\/?$/, "/")}lieblingsplatz.jpeg`;
        // für das Carousel verwenden wir explizit das Kneipenbild
        const image = ev.kneipen_bild_url || fallbackSrc;
        const category = [ev.ort, ev.adresse].filter(Boolean).join(", ") || "–";
        return {
          image,
          title: ev.kneipe,
          category,
          url: ev.website_url ?? undefined,
          key: `${ev.kneipe ?? "ev"}-${ev.ort ?? ""}-${i}`,
        };
      });
  }, [events]);

  const slides = slidesData.map((item) => {
    const { key, ...cardProps } = item;
    return (
      <Carousel.Slide key={key}>
        <LocationCard {...cardProps} />
      </Carousel.Slide>
    );
  });

  return (
    <section id="standorte" className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text
            className={classes.eyebrow}
            size="sm"
            fw={600}
            tt="uppercase"
            lts={1}
          >
            Standorte
          </Text>
          <Title order={2} className={classes.title}>
            Unsere Quiz-Kneipen
          </Title>
        </div>

        <Carousel
          slideSize="100%"
          slideGap={0}
          emblaOptions={{ align: "start", slidesToScroll: 1, loop: true }}
          withIndicators={slidesData.length > 1}
          classNames={{ indicators: classes.indicators }}
        >
          {slides}
        </Carousel>
      </Container>
    </section>
  );
}
