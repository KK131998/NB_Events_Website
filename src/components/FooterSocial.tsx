import { IconBrandInstagram } from '@tabler/icons-react';
import { ActionIcon, Container, Group } from '@mantine/core';
import classes from '../styles/FooterSocial.module.scss';

export default function FooterSocial() {
    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
                    {/*
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    */}
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
                </Group>
            </Container>
        </div>
    );
}