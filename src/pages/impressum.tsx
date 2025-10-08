import { Container, Paper, Stack, Title, Text } from "@mantine/core";

export default function Impressum() {
    return (
        <Container size="md" py="xl">
            <Paper radius="lg" p="xl" shadow="sm">
                <Stack gap="md">
                    <Title order={2}>Impressum</Title>

                    <Text>
                        <b>Angaben gemäß § 5 TMG:</b><br />
                        NB Events<br />
                        Musterstraße 12<br />
                        46519 Sonsbeck
                    </Text>

                    <Text>
                        <b>Vertreten durch:</b><br />
                        Nikki Binn
                    </Text>

                    <Text>
                        <b>Kontakt:</b><br />
                        Telefon: +49 176 12345678<br />
                        E-Mail: Nikki.Binn@kneipenquiz.org
                    </Text>

                    <Text>
                        <b>Umsatzsteuer-ID:</b><br />
                        DE123456789
                    </Text>

                    <Text size="sm" c="dimmed">
                        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                        Nikki Binn, Musterstraße 12, 46519 Sonsbeck
                    </Text>
                </Stack>
            </Paper>
        </Container>
    );
}
