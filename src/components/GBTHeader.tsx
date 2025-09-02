// src/components/SiteHeader.tsx
import { Container, Group, Anchor, Button, Burger, Drawer, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const LINKS = [
    { label: "Anmeldung", href: "#mitmachen" },
    { label: "Standorte", href: "#standorte" },
    { label: "Über Uns", href: "#ueberuns" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontakt", href: "#kontakt" }
];

export default function GBTHeader() {
    const [opened, { toggle, close }] = useDisclosure(false);

    return (
        <div style={{
            position: "sticky", top: 0, zIndex: 100,
            backdropFilter: "saturate(180%) blur(10px)",
            background: "transparent",
            borderBottom: "1px solid rgba(0,0,0,.06)",
        }}>
            <Container size="lg" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Group gap="xs">
                    <img src="/nikki_logo.jpeg" alt="NB Events" style={{ height: 32, width: 32, borderRadius: 6 }} />
                    <Text fw={700}>NB Events</Text>
                </Group>

                {/* Desktop */}
                <Group gap="lg" visibleFrom="sm">
                    {LINKS.map(l => (
                        <Anchor key={l.href} href={l.href} underline="never" fw={500} fz="sm">
                            {l.label}
                        </Anchor>
                    ))}
                </Group>

                {/* Mobile */}
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" aria-label="Menü" />
            </Container>

            <Drawer opened={opened} onClose={close} padding="md" size="xs" title="Menü" hiddenFrom="sm">
                <Stack gap="sm">
                    {LINKS.map(l => (
                        <Button key={l.href} variant="subtle" component="a" href={l.href} onClick={close}>
                            {l.label}
                        </Button>
                    ))}
                    <Button component="a" href="#anmeldung" onClick={close}>Jetzt anmelden</Button>
                </Stack>
            </Drawer>
        </div>
    );
}
