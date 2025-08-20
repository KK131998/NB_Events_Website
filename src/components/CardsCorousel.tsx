import { Carousel } from '@mantine/carousel';
import { Button, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from '../styles/CardsCarousel.module.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

interface CardProps {
    image: string;
    title: string;
    category: string;
}


function Card({ image, title, category }: CardProps) {
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
            <Button variant="white" color="dark">
                Zur Webseite
            </Button>
        </Paper>
    );
}

export default function CardsCarousel({ events = [] }: { events: any[] }) {

    const slidesData = events.map((ev) => ({
        image: ev.bild_url ?? '/kneipen_template.jpg',
        title: ev.kneipe,
        category: `${ev.ort}, ${ev.adresse}`,
    }));

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