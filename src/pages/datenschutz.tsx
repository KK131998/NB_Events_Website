import { Container, Paper, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Footer from "../components/FooterSocial";
import GBTHeader from "../components/GBTHeader";
import classes from "../styles/Legal.module.scss";

export default function Datenschutz() {
  return (
    <>
      <GBTHeader />
      <main className={classes.main}>
        <Container size="md" py="xl">
          <div className={classes.header}>
            <Text
              className={classes.eyebrow}
              size="sm"
              fw={600}
              tt="uppercase"
              lts={1}
            >
              Rechtliches
            </Text>
            <Title order={1} className={classes.title}>
              Datenschutzerklärung
            </Title>
          </div>

          <Paper className={classes.card} radius="lg" p="xl" shadow="sm">
            <Stack gap="xl">
              <Text c="dimmed" lh={1.7}>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                Personenbezogene Daten werden auf dieser Website nur im technisch
                notwendigen Umfang erhoben. Eine Weitergabe an Dritte erfolgt
                nicht ohne Ihre ausdrückliche Zustimmung.
              </Text>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  1. Verantwortlicher
                </Text>
                <Text c="dimmed" lh={1.7}>
                  NB Events
                  <br />
                  Nikki Binn
                  <br />
                  Musterstraße 12
                  <br />
                  46519 Sonsbeck
                  <br />
                  E-Mail: NB.Events@Web.de
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  2. Erhebung und Speicherung personenbezogener Daten
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Beim Besuch unserer Website werden automatisch Informationen
                  allgemeiner Natur erfasst (z. B. IP-Adresse, Browsertyp, Datum
                  und Uhrzeit). Diese Daten lassen keine Rückschlüsse auf Ihre
                  Person zu und dienen nur der technischen Optimierung.
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  3. Kontaktformular
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre
                  Angaben zwecks Bearbeitung der Anfrage sowie für den Fall von
                  Anschlussfragen gespeichert.
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  4. Ihre Rechte
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
                  Löschung oder Einschränkung der Verarbeitung Ihrer
                  gespeicherten Daten sowie das Recht auf Widerspruch gegen die
                  Verarbeitung.
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  5. Hosting
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Unsere Website wird bei einem externen Anbieter gehostet. Mit
                  diesem besteht ein Vertrag zur Auftragsverarbeitung gemäß Art.
                  28 DSGVO.
                </Text>
              </section>
            </Stack>
          </Paper>

          <div className={classes.back}>
            <Link to="/" className={classes.backLink}>
              ← Zurück zur Startseite
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
