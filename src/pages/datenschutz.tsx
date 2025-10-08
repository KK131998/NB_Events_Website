import { Container, Paper, Stack, Title, Text } from "@mantine/core";

export default function Datenschutz() {
    return (
        <Container size="md" py="xl">
            <Paper radius="lg" p="xl" shadow="sm">
                <Stack gap="md">
                    <Title order={2}>Datenschutzerklärung</Title>

                    <Text>
                        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                        Personenbezogene Daten werden auf dieser Website nur im
                        technisch notwendigen Umfang erhoben. Eine Weitergabe an
                        Dritte erfolgt nicht ohne Ihre ausdrückliche Zustimmung.
                    </Text>

                    <Title order={3}>1. Verantwortlicher</Title>
                    <Text>
                        NB Events<br />
                        Nikki Binn<br />
                        Musterstraße 12<br />
                        46519 Sonsbeck<br />
                        E-Mail: Nikki.Binn@kneipenquiz.org
                    </Text>

                    <Title order={3}>2. Erhebung und Speicherung personenbezogener Daten</Title>
                    <Text>
                        Beim Besuch unserer Website werden automatisch Informationen
                        allgemeiner Natur erfasst (z. B. IP-Adresse, Browsertyp, Datum
                        und Uhrzeit). Diese Daten lassen keine Rückschlüsse auf Ihre
                        Person zu und dienen nur der technischen Optimierung.
                    </Text>

                    <Title order={3}>3. Kontaktformular</Title>
                    <Text>
                        Wenn Sie uns über das Kontaktformular kontaktieren, werden
                        Ihre Angaben zwecks Bearbeitung der Anfrage sowie für den
                        Fall von Anschlussfragen gespeichert.
                    </Text>

                    <Title order={3}>4. Ihre Rechte</Title>
                    <Text>
                        Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
                        Löschung oder Einschränkung der Verarbeitung Ihrer gespeicherten
                        Daten sowie das Recht auf Widerspruch gegen die Verarbeitung.
                    </Text>

                    <Title order={3}>5. Hosting</Title>
                    <Text>
                        Unsere Website wird bei einem externen Anbieter gehostet.
                        Mit diesem besteht ein Vertrag zur Auftragsverarbeitung gemäß
                        Art. 28 DSGVO.
                    </Text>
                </Stack>
            </Paper>
        </Container>
    );
}
