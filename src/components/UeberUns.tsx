
// src/components/UeberUns.tsx
import { Container, Paper, Stack, Title, Text, Group } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

export default function UeberUns() {
  return (
    <Container size="" py="xl">
      <Paper
        radius="lg"
        p="xl"
        shadow="sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(206,216,224,0.35) 0%, rgba(113,116,118,0.15) 100%)",
          border: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        <Stack gap="sm">
          <Group gap="xs">
            <IconUsers size={24} />
            <Title order={2}>Über uns</Title>
          </Group>

          <Text>
            Wir sind ein kleines, kreatives Team aus Sonsbeck, das eins liebt:
            Menschen zusammenbringen – und zwar mit Spaß, Witz und einer guten Portion Köpfchenarbeit.
          </Text>

          <Text>
            Unser Ziel ist es, klassische Kneipenabende in etwas Besonderes zu verwandeln.
            Kein dröges Frageraten, sondern spannende, abwechslungsreiche Runden, in denen jeder mal glänzen kann –
            vom Sportfan bis zur Serienliebhaberin.
          </Text>

          <Text>
            Ob in der Lieblingskneipe, bei Firmenfeiern oder auf Dorffesten –
            NBEvents bringt das Quiz zu dir!
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
