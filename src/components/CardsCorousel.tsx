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

const base = import.meta.env.BASE_URL || "/";
const TEMPLATES = [`${base}kneipen_template_10.jpg`];

const pickRandomTemplate = () =>
  TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];

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
    return events
      .filter((ev: any) => {
        const id = `${ev.kneipe ?? ""}-${ev.ort ?? ""}`;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((ev: any, i: number) => {
        const src = "lieblingsplatz.jpeg".trim();
        const image = src.startsWith("http")
          ? src
          : `${import.meta.env.BASE_URL}${src || pickRandomTemplate()}`;
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
