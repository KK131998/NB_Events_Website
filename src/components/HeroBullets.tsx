// src/components/HeroBullets.tsx
import { Container, List, Text, ThemeIcon, Title } from "@mantine/core";
import { IconRefresh, IconPalette, IconTrophy } from "@tabler/icons-react";
import NikkiLogoPlaneScene from "./NikkiLogoPlane";
import classes from "../styles/HeroBullets.module.scss";

export default function HeroBullets() {
  return (
    <section className={classes.hero}>
      <Container size="lg">
        <div className={classes.inner}>
          {/* Linke Spalte: Text */}
          <div className={classes.content}>
            <Text
              className={classes.eyebrow}
              size="sm"
              fw={600}
              tt="uppercase"
              lts={1}
            >
              Kneipenquiz · Live Events
            </Text>
            <Title className={classes.title} order={1}>
              NB Events –{" "}
              <span className={classes.title}>
                Dein Abend. Dein Team. Dein Quiz.
              </span>
            </Title>
            <Text className={classes.subtitle} c="dimmed" mt="md">
              Wir bringen Köpfe zum Rauchen, Herzen zum Lachen und Tische zum
              Beben. Ob in deiner Lieblingskneipe, beim Vereinsabend oder als
              Firmenevent – unsere Quiz-Veranstaltungen sind ein Erlebnis, das
              verbindet.
            </Text>
            <List mt="xl" spacing="md" size="md" className={classes.list}>
              <List.Item
                icon={
                  <ThemeIcon
                    size={28}
                    radius="xl"
                    variant="light"
                    color="orange"
                  >
                    <IconRefresh size={16} />
                  </ThemeIcon>
                }
              >
                Regelmäßig neue Fragen
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon
                    size={28}
                    radius="xl"
                    variant="light"
                    color="orange"
                  >
                    <IconPalette size={16} />
                  </ThemeIcon>
                }
              >
                Wechselnde Themenrunden
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon
                    size={28}
                    radius="xl"
                    variant="light"
                    color="orange"
                  >
                    <IconTrophy size={16} />
                  </ThemeIcon>
                }
              >
                Gewinne & ewiger Ruhm im Freundeskreis
              </List.Item>
            </List>
          </div>
          {/* Rechte Spalte: drehendes Logo */}
          <div className={classes.image}>
            <NikkiLogoPlaneScene />
          </div>
        </div>
      </Container>
    </section>
  );
}
