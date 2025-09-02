import { Accordion, Container, Title } from '@mantine/core';
import classes from '../styles/FaqSimple.module.css';

export default function FaqSimple() {
    return (
        <Container size="lg" className={classes.wrapper}>
            <Title ta="center" className={classes.title}>
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value="reset-password">
                    <Accordion.Control>Wie lange dauert ein Kneipenquiz? </Accordion.Control>
                    <Accordion.Panel>Meist zwischen 3 und 4 Stunden inklusive Pausen.</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="another-account">
                    <Accordion.Control>Brauche ich Vorwissen?</Accordion.Control>
                    <Accordion.Panel>Nein, die Fragen sind bunt gemischt – jeder kann punkten.</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="newsletter">
                    <Accordion.Control>Kostet die Teilnahme etwas?</Accordion.Control>
                    <Accordion.Panel>Kommt auf die Location an – oft gibt es eine kleine Startgebühr pro Person oder Team.</Accordion.Panel>
                </Accordion.Item>

            </Accordion>
        </Container>
    );
}