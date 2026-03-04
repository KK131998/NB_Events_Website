// src/components/TermineListe.tsx
import { Button, Card, Container, Group, SimpleGrid, Text, Title } from "@mantine/core";
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
  preis_pro_person?: number | null;
};

export default function TermineListe({ termine }: { termine: Termin[] }) {
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

  const eur = useMemo(
    () =>
      new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
    [],
  );

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

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

                  {typeof t.preis_pro_person === "number" && (
                    <Text size="sm" fw={500} mt="sm">
                      {eur.format(t.preis_pro_person)} pro Person
                    </Text>
                  )}

                  <Button
                    mt="lg"
                    variant="light"
                    color="orange"
                    fullWidth
                  >
                    Tickets vor Ort
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
    </section>
  );
}
