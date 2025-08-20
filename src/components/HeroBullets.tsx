// src/components/HeroBullets.tsx
import { Container, List, Text, ThemeIcon, Title } from '@mantine/core';
import NikkiLogoPlaneScene from '../components/NikkiLogoPlane'; // <– drehendes Logo importieren
import classes from '../styles/HeroBullets.module.scss';

export default function HeroBullets() {
    return (
        <Container size="md">
            <div className={classes.inner}>
                {/* Linke Spalte: Text */}
                <div className={classes.content}>
                    <Title className={classes.title}>
                        NB Events - <span> Kneipenquize in deiner Umgebung</span>
                    </Title>

                    <Text c="dimmed" mt="md">
                        Alle kommenden Termine & Highlights auf einen Blick.
                    </Text>

                    <List mt={30} spacing="sm" size="sm" icon={<ThemeIcon size={20} radius="xl" />}>
                        <List.Item><b>Jeden Donnerstag</b> – neue Fragen, neue Musikrunden</List.Item>
                        <List.Item><b>Teams</b> – tretet gemeinsam gegen andere an</List.Item>
                        <List.Item><b>Preise & Ruhm</b> – klaro 😉</List.Item>
                    </List>

                </div>

                {/* Rechte Spalte: drehendes Logo */}
                <div className={classes.image}>
                    <NikkiLogoPlaneScene />
                </div>
            </div>
        </Container>
    );
}
