import { useState, useMemo } from 'react';
import { Button, Group, Paper, SimpleGrid, Text, Textarea, TextInput, Alert } from '@mantine/core';
import classes from '../styles/GetInTouch.module.scss';

type Status = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string };

export default function Kontaktformular() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>({ type: 'idle' });

    const errors = useMemo(() => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = 'Bitte gib deinen Namen an.';
        if (!email.trim()) e.email = 'E‑Mail fehlt.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) e.email = 'Ungültige E‑Mail-Adresse.';
        if (!subject.trim()) e.subject = 'Betreff fehlt.';
        if (!message.trim()) e.message = 'Nachricht fehlt.';
        return e;
    }, [name, email, subject, message]);

    const isDisabled = status.type === 'loading' || Object.keys(errors).length > 0;

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (Object.keys(errors).length) {
            setStatus({ type: 'error', message: 'Bitte prüfe deine Eingaben.' });
            return;
        }

        setStatus({ type: 'loading' });

        try {
            const formData = new FormData();
            formData.append("access_key", "371551ae-f927-4e1e-a55a-32b511a9f7a9"); // <- hier deinen echten Key einsetzen
            formData.append("Website:", "NB-Events - Kontaktformular");
            formData.append("name", name.trim());
            formData.append("email", email.trim());
            formData.append("subject", subject.trim());
            formData.append("message", message.trim());

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                setStatus({ type: 'success', message: 'Danke! Deine Nachricht wurde versendet.' });
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
            } else {
                throw new Error(data.message || "Senden fehlgeschlagen.");
            }

        } catch (err: any) {
            setStatus({ type: 'error', message: err?.message || 'Senden fehlgeschlagen.' });
        }
    }


    return (
        <Paper shadow="md" radius="lg">
            <div className={classes.wrapper}>
                <div className={classes.contacts} style={{ background: 'linear-gradient(135deg, #ced8e0ff 0%, #717476ff 100%)' }}>
                    <Text fz="lg" fw={700} c="black" mb="xl">Kontakt</Text>
                    {/*
                    <Group gap="xs" align="center" mb="md" wrap="nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M3 5.75C3 4.784 3.784 4 4.75 4h2.982c.848 0 1.58.593 1.736 1.427l.661 3.436a1.75 1.75 0 01-.448 1.542l-1.37 1.37a14.23 14.23 0 006.379 6.379l1.37-1.37c.414-.414 1.012-.59 1.542-.448l3.436.661A1.75 1.75 0 0120 18.268V21.25c0 .966-.784 1.75-1.75 1.75h-.5C9.268 23 1 14.732 1 4.75v-.5z" /></svg>
                        <Text size="sm" fw={500} c="black">+49 176 12345678</Text>
                    </Group>
                        */}
                    <Group gap="xs" align="center" wrap="nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M2.25 4.5A2.25 2.25 0 014.5 2.25h15a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 19.5v-15zM4.5 4.5l7.5 7.5 7.5-7.5h-15zm0 2.121V19.5h15V6.621l-7.072 7.071a.75.75 0 01-1.06 0L4.5 6.621z" /></svg>
                        <Text size="sm" fw={500} c="black">NB.Events@Web.de</Text>
                    </Group>
                </div>

                <form className={classes.form} onSubmit={onSubmit}>
                    <Text fz="lg" fw={700} className={classes.title}>Kontaktformular</Text>

                    {status.type !== 'idle' && status.message && (
                        <Alert mt="sm" color={status.type === 'success' ? 'green' : 'red'}>
                            {status.message}
                        </Alert>
                    )}

                    <div className={classes.fields}>
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <TextInput
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                                required
                                error={status.type === 'error' ? errors.name : undefined}
                            />
                            <TextInput
                                placeholder="Deine E-Mail"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                required
                                error={status.type === 'error' ? errors.email : undefined}
                            />
                        </SimpleGrid>

                        <TextInput
                            mt="md"
                            placeholder="Betreff"
                            value={subject}
                            onChange={(e) => setSubject(e.currentTarget.value)}
                            required
                            error={status.type === 'error' ? errors.subject : undefined}
                        />
                        <Textarea
                            mt="md"
                            placeholder="Nachricht"
                            minRows={3}
                            value={message}
                            onChange={(e) => setMessage(e.currentTarget.value)}
                            required
                            error={status.type === 'error' ? errors.message : undefined}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button
                                type="submit"
                                className={classes.control}
                                loading={status.type === 'loading'}
                                disabled={isDisabled}
                            >
                                Abschicken
                            </Button>
                        </Group>
                    </div>

                </form>
            </div>
        </Paper>
    );
}
