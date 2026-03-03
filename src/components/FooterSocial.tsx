import { ActionIcon, Container, Group } from "@mantine/core";
import { IconBrandInstagram } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "../styles/FooterSocial.module.scss";

export default function FooterSocial() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group gap="xl" className={classes.links} justify="center" wrap="wrap">
          <ActionIcon
            size="lg"
            color="orange"
            variant="subtle"
            component="a"
            href="https://www.instagram.com/_nbevents/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
          <Link to="/impressum" className={classes.link}>
            Impressum
          </Link>
          <Link to="/datenschutz" className={classes.link}>
            Datenschutz
          </Link>
        </Group>
      </Container>
    </footer>
  );
}
