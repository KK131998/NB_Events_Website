// src/components/GBTHeader.tsx
import {
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "../styles/GBTHeader.module.scss";

const LINKS = [
  { label: "Mitmachen", href: "/#mitmachen" },
  { label: "Termine", href: "/#termine" },
  { label: "Standorte", href: "/#standorte" },
  { label: "Über uns", href: "/#ueberuns" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function GBTHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Link to="/" className={classes.brandLink}>
          <img
            src="/nikki_logo.jpeg"
            alt="NB Events"
            className={classes.logo}
          />
          <Text className={classes.brand}>NB Events</Text>
        </Link>

        <Group gap={4} visibleFrom="md" className={classes.links}>
          {LINKS.map((l) => (
            <Button
              key={l.href}
              variant="subtle"
              component="a"
              href={l.href}
              className={classes.link}
              size="sm"
            >
              {l.label}
            </Button>
          ))}
        </Group>

        <Group gap="sm">
          <Button
            component="a"
            href="/#termine"
            className={classes.cta}
            size="sm"
            visibleFrom="sm"
          >
            Tickets
          </Button>
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Menü"
            color="orange"
            hiddenFrom="md"
          />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="xs"
        title="Menü"
        position="right"
      >
        <Stack gap="sm">
          {LINKS.map((l) => (
            <Button
              key={l.href}
              variant="subtle"
              component="a"
              href={l.href}
              onClick={close}
              color="orange"
              className={classes.drawerLink}
            >
              {l.label}
            </Button>
          ))}
          <Button
            component="a"
            href="/#termine"
            onClick={close}
            className={classes.cta}
            mt="xs"
          >
            Tickets
          </Button>
        </Stack>
      </Drawer>
    </header>
  );
}
