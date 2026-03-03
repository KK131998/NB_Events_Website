import { useState, useMemo } from "react";
import {
  Alert,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import classes from "../styles/Kontaktformular.module.scss";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export default function Kontaktformular() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Bitte gib deinen Namen an.";
    if (!email.trim()) e.email = "E‑Mail fehlt.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email))
      e.email = "Ungültige E‑Mail-Adresse.";
    if (!subject.trim()) e.subject = "Betreff fehlt.";
    if (!message.trim()) e.message = "Nachricht fehlt.";
    return e;
  }, [name, email, subject, message]);

  const isDisabled =
    status.type === "loading" || Object.keys(errors).length > 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.keys(errors).length) {
      setStatus({ type: "error", message: "Bitte prüfe deine Eingaben." });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const formData = new FormData();
      formData.append(
        "access_key",
        "371551ae-f927-4e1e-a55a-32b511a9f7a9"
      );
      formData.append("Website:", "NB-Events - Kontaktformular");
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("subject", subject.trim());
      formData.append("message", message.trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Danke! Deine Nachricht wurde versendet.",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(data.message || "Senden fehlgeschlagen.");
      }
    } catch (err: unknown) {
      setStatus({
        type: "error",
        message:
          err instanceof Error ? err.message : "Senden fehlgeschlagen.",
      });
    }
  }

  return (
    <section id="kontakt" className={classes.section}>
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
              Kontakt
            </Text>
            <Title order={2} className={classes.title}>
              Schreib uns
            </Title>
          </div>

          <Paper className={classes.card} radius="lg" shadow="sm" p={0}>
            <div className={classes.inner}>
              <div className={classes.contactInfo}>
                <ThemeIcon size={48} radius="xl" variant="light" color="orange">
                  <IconMail size={24} />
                </ThemeIcon>
                <Text fw={600} size="lg" mt="md">
                  NB.Events@Web.de
                </Text>
                <Text size="sm" c="dimmed" mt="xs">
                  Wir melden uns in der Regel innerhalb von 1–2 Tagen.
                </Text>
              </div>

              <form className={classes.form} onSubmit={onSubmit}>
                <Stack gap="md">
                  {status.type !== "idle" && status.message && (
                    <Alert
                      color={status.type === "success" ? "green" : "red"}
                      variant="light"
                      radius="md"
                    >
                      {status.message}
                    </Alert>
                  )}

                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      label="Name"
                      placeholder="Dein Name"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      error={status.type === "error" ? errors.name : undefined}
                      required
                    />
                    <TextInput
                      label="E-Mail"
                      placeholder="deine@email.de"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      error={status.type === "error" ? errors.email : undefined}
                      required
                    />
                  </SimpleGrid>

                  <TextInput
                    label="Betreff"
                    placeholder="Worum geht es?"
                    value={subject}
                    onChange={(e) => setSubject(e.currentTarget.value)}
                    error={status.type === "error" ? errors.subject : undefined}
                    required
                  />

                  <Textarea
                    label="Nachricht"
                    placeholder="Deine Nachricht an uns..."
                    minRows={4}
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    error={status.type === "error" ? errors.message : undefined}
                    required
                  />

                  <Group justify="flex-end">
                    <Button
                      type="submit"
                      color="orange"
                      size="md"
                      radius="xl"
                      loading={status.type === "loading"}
                      disabled={isDisabled}
                      className={classes.submitBtn}
                    >
                      Abschicken
                    </Button>
                  </Group>
                </Stack>
              </form>
            </div>
          </Paper>
        </Stack>
      </Container>
    </section>
  );
}
