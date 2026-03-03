// src/components/UeberUns.tsx
import { Container, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconHeart, IconSparkles, IconTarget } from "@tabler/icons-react";
import classes from "../styles/UeberUns.module.scss";

export default function UeberUns() {
  return (
    <section id="ueberuns" className={classes.section}>
      <Container size="lg">
        <Stack gap="xl">
          <div className={classes.header}>
            <Text
              className={classes.eyebrow}
              size="sm"
              fw={600}
              tt="uppercase"
              lts={1}
            >
              Über uns
            </Text>
            <Title order={2} className={classes.title}>
              Ein kleines Team mit großer Quiz-Leidenschaft
            </Title>
          </div>

          <Paper className={classes.card} radius="lg" p="xl" shadow="sm">
            <Stack gap="lg">
              <div className={classes.intro}>
                <Text size="lg" lh={1.7}>
                  Wir sind ein kleines, kreatives Team aus Sonsbeck, das eins liebt:
                  Menschen zusammenbringen – mit Spaß, Witz und einer guten Portion
                  Köpfchenarbeit.
                </Text>
              </div>

              <div className={classes.highlights}>
                <div className={classes.highlight}>
                  <ThemeIcon size={40} radius="xl" variant="light" color="orange">
                    <IconTarget size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="md">
                      Unser Ziel
                    </Text>
                    <Text c="dimmed" size="sm" mt="xs" lh={1.6}>
                      Klassische Kneipenabende in etwas Besonderes verwandeln.
                      Kein dröges Frageraten, sondern spannende Runden, in denen
                      jeder mal glänzen kann – vom Sportfan bis zur Serienliebhaberin.
                    </Text>
                  </div>
                </div>
                <div className={classes.highlight}>
                  <ThemeIcon size={40} radius="xl" variant="light" color="orange">
                    <IconSparkles size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="md">
                      Überall dabei
                    </Text>
                    <Text c="dimmed" size="sm" mt="xs" lh={1.6}>
                      Ob in der Lieblingskneipe, bei Firmenfeiern oder auf Dorffesten –
                      NBEvents bringt das Quiz zu dir!
                    </Text>
                  </div>
                </div>
              </div>

              <div className={classes.tagline}>
                <IconHeart
                  size={20}
                  className={classes.heart}
                  stroke={1.5}
                />
                <Text size="sm" c="dimmed" fs="italic">
                  Menschen verbinden, Abende verwandeln – dafür stehen wir.
                </Text>
              </div>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </section>
  );
}
