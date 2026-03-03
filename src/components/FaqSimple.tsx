import { Accordion, Container, Text, Title } from "@mantine/core";
import classes from "../styles/FaqSimple.module.scss";

const FAQ_ITEMS = [
  {
    value: "dauer",
    question: "Wie lange dauert ein Kneipenquiz?",
    answer:
      "Meist zwischen 3 und 4 Stunden inklusive Pausen.",
  },
  {
    value: "vorwissen",
    question: "Brauche ich Vorwissen?",
    answer:
      "Nein, die Fragen sind bunt gemischt – jeder kann punkten.",
  },
  {
    value: "kosten",
    question: "Kostet die Teilnahme etwas?",
    answer:
      "Kommt auf die Location an – oft gibt es eine kleine Startgebühr pro Person oder Team.",
  },
];

export default function FaqSimple() {
  return (
    <section id="faq" className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text
            className={classes.eyebrow}
            size="sm"
            fw={600}
            tt="uppercase"
            lts={1}
          >
            FAQ
          </Text>
          <Title order={2} className={classes.title}>
            Häufige Fragen
          </Title>
        </div>

        <Accordion
          variant="separated"
          radius="lg"
          className={classes.accordion}
          classNames={{
            item: classes.item,
            control: classes.control,
            panel: classes.panel,
          }}
          defaultValue={null}
        >
          {FAQ_ITEMS.map(({ value, question, answer }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Control>{question}</Accordion.Control>
              <Accordion.Panel>{answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
