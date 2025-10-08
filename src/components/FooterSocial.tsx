import { IconBrandInstagram } from '@tabler/icons-react';
import { ActionIcon, Container, Group } from '@mantine/core';
import classes from '../styles/FooterSocial.module.scss';

export default function FooterSocial() {
    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group gap="md" className={classes.links} justify="flex-end" wrap="nowrap">
                    {/* Social Icons */}
                    <ActionIcon
                        size="lg"
                        color="gray"
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

                    {/* Impressum & Datenschutz 
                    <Anchor
                        href="/impressum"
                        size="sm"
                        c="dimmed"
                        underline="hover"
                    >
                        Impressum
                    </Anchor>
                    <Anchor
                        href="/datenschutz"
                        size="sm"
                        c="dimmed"
                        underline="hover"
                    >
                        Datenschutz
                    </Anchor>
                    */}
                </Group>
            </Container>
        </div>
    );
}
