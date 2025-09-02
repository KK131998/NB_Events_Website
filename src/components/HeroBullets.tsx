// src/components/HeroBullets.tsx
import { Container, List, Text, ThemeIcon, Title } from '@mantine/core';
import NikkiLogoPlaneScene from '../components/NikkiLogoPlane'; // <– drehendes Logo importieren
import classes from '../styles/HeroBullets.module.scss';

export default function HeroBullets() {
    return (
        <Container size="lg">
            <div className={classes.inner}>
                {/* Linke Spalte: Text */}
                <div className={classes.content}>
                    <Title className={classes.title}>
                        NB Events - <span> Dein Abend. Dein Team. Dein Quiz </span>
                    </Title>

                    <Text c="dimmed" mt="md">
                        Willkommen bei NBEvents – wir bringen Köpfe zum Rauchen, Herzen zum Lachen und Tische zum Beben!
                        Ob in deiner Lieblingskneipe, bei einem Vereinsabend oder als Firmenevent – unsere Kneipenquiz-Veranstaltungen sind mehr als nur ein Spiel. Sie sind ein Erlebnis, das Freundeskreise zusammenschweißt, Teams herausfordert und jede Menge Spaß garantiert.
                    </Text>

                    <List mt={30} spacing="sm" size="sm" icon={<ThemeIcon size={20} radius="xl" />}>
                        <List.Item><b>Regelmäßig neue Fragen</b></List.Item>
                        <List.Item><b>Wechselnde Themenrunden</b></List.Item>
                        <List.Item><b>Gewinne, die sich sehen lassen können – und mindestens ewigen Ruhm im Freundeskreis</b></List.Item>
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
