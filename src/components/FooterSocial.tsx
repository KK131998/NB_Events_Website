import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { IconBrandInstagram } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "../styles/FooterSocial.module.scss";

export default function FooterSocial() {
  return (
    <footer id="kontakt" className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.brand}>
          <Text className={classes.brandName} size="lg">
            NB Events
          </Text>
          <Text className={classes.tagline} mt={4}>
            Kneipenquiz · Live Events
          </Text>
        </div>

        <a className={classes.mail} href="mailto:NB.Events@Web.de">
          NB.Events@Web.de
        </a>

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
            <IconBrandInstagram size={22} stroke={1.5} />
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
