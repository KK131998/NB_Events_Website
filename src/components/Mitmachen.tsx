
// src/components/Mitmachen.tsx
import { Container, Paper, Stack, Title, Text, List, ThemeIcon, Divider, Group } from "@mantine/core";
import { IconCheck, IconSparkles } from "@tabler/icons-react";

export default function Mitmachen() {
  return (
    <Container size="lg" py="xl">
      <Paper
        radius="lg"
        p="xl"
        shadow="sm"
        mx="auto"
      >
        <Stack gap="sm">
          <Group gap="xs">
            <IconSparkles size={24} />
            <Title order={1}>So bist du dabei</Title>
          </Group>

          <List
            spacing="md"
            size="sm"
            mt="xs"
            icon={
              <ThemeIcon size={22} radius="xl" variant="light">
                <IconCheck size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              Such dir ein paar quizfreudige Freunde (max. Teamgröße: 6–7 Personen)
            </List.Item>
            <List.Item>
              Melde dein Team über unsere Instagram-Seite oder gleich hier direkt an.
              Fülle einfach das Formular aus und warte etwas ab. Wir bestätigen deine Teilnahme per E-Mail.
            </List.Item>
            <List.Item>
              Komm rechtzeitig – die besten Plätze sind schnell weg.
            </List.Item>
          </List>

          <Divider my="xs" />

          <Text c="dimmed">
            Keine Sorge: Es geht bei uns nicht um Hochleistung, sondern um Spaß, Teamgeist und
            den ein oder anderen Aha-Moment.
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
