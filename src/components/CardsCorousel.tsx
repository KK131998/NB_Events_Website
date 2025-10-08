import { Carousel } from '@mantine/carousel';
import { Button, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from '../styles/CardsCarousel.module.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { useMemo } from 'react'; // ⬅️ neu

interface CardProps {
    image: string;
    title: string;
    category: string;
    url: string;
}

const base = import.meta.env.BASE_URL || '/';
const TEMPLATES = [
    `${base}kneipen_template_10.jpg`,
];

const pickRandomTemplate = () =>
    TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];


function Card({ image, title, category, url }: CardProps) {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button
                variant="white"
                color="dark"
                component="a"
                href={url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                disabled={!url}
            >
                Zur Webseite
            </Button>
        </Paper>
    );
}

export default function CardsCarousel({ events = [] }: { events: any[] }) {

    const slidesData = useMemo(() => {
        return events.map((ev: any, i: number) => {
            const src = (ev.bild_url ?? '').trim();
            const image = src.startsWith('http')
                ? src
                : `${import.meta.env.BASE_URL}${src || pickRandomTemplate()}`;
            // ⬅️ random Fallback
            return {
                image,
                title: ev.kneipe,
                category: `${ev.ort}, ${ev.adresse}`,
                url: ev.website_url ?? undefined,
                key: `${ev.kneipe ?? 'ev'}-${i}`, // stabiler key
            };
        });
    }, [events]);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = slidesData.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize={{ base: '100%', sm: '100%' }}
            slideGap={1}
            emblaOptions={{ align: 'start', slidesToScroll: mobile ? 1 : 1 }}
        >
            {slides}
        </Carousel>
    );
}