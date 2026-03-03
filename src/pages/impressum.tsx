import { Container, Paper, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Footer from "../components/FooterSocial";
import GBTHeader from "../components/GBTHeader";
import classes from "../styles/Legal.module.scss";

export default function Impressum() {
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
              Impressum
            </Title>
          </div>

          <Paper className={classes.card} radius="lg" p="xl" shadow="sm">
            <Stack gap="xl">
              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  Angaben gemäß § 5 TMG
                </Text>
                <Text c="dimmed" lh={1.7}>
                  NB Events
                  <br />
                  Musterstraße 12
                  <br />
                  46519 Sonsbeck
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  Vertreten durch
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Nikki Binn
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  Kontakt
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Telefon: +49 176 12345678
                  <br />
                  E-Mail: NB.Events@Web.de
                </Text>
              </section>

              <section>
                <Text component="h2" className={classes.sectionTitle}>
                  Umsatzsteuer-ID
                </Text>
                <Text c="dimmed" lh={1.7}>
                  DE123456789
                </Text>
              </section>

              <Text size="sm" c="dimmed" mt="md">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Nikki Binn,
                Musterstraße 12, 46519 Sonsbeck
              </Text>
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
