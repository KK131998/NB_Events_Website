// src/components/Mitmachen.tsx
import {
  Box,
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconClock, IconEdit, IconUsers } from "@tabler/icons-react";
import classes from "../styles/Mitmachen.module.scss";

const STEPS = [
  {
    icon: IconUsers,
    num: "1",
    title: "Team zusammenstellen",
    text: "Sammle 2–6 Freunde und bildet ein Team. Maximal 6–7 Personen pro Team.",
  },
  {
    icon: IconEdit,
    num: "2",
    title: "Anmelden",
    text: "Melde dich über Instagram oder hol dir Tickets direkt vor Ort",
  },
  {
    icon: IconClock,
    num: "3",
    title: "Pünktlich kommen",
    text: "Die besten Plätze sind schnell weg – komm rechtzeitig und mach dich bereit fürs Quiz.",
  },
];

export default function Mitmachen() {
  return (
    <section className={classes.section}>
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
              Mitmachen
            </Text>
            <Title order={2} className={classes.title}>
              So bist du dabei
            </Title>
          </div>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            {STEPS.map(({ icon: Icon, num, title, text }) => (
              <Paper
                key={num}
                className={classes.step}
                radius="lg"
                p="lg"
                shadow="sm"
              >
                <div className={classes.stepNum}>{num}</div>
                <ThemeIcon size={44} radius="xl" variant="light" color="orange">
                  <Icon size={22} />
                </ThemeIcon>
                <Text fw={600} size="lg" mt="xs">
                  {title}
                </Text>
                <Text c="dimmed" size="sm" mt="xs" lh={1.6}>
                  {text}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>

          <Box className={classes.footer}>
            <Text c="dimmed" size="sm" ta="center" maw={480} mx="auto">
              Keine Sorge: Es geht bei uns nicht um Hochleistung, sondern um
              Spaß, Teamgeist und den ein oder anderen Aha-Moment.
            </Text>
          </Box>
        </Stack>
      </Container>
    </section>
  );
}
