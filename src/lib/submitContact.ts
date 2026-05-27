export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("VITE_WEB3FORMS_ACCESS_KEY fehlt in .env");
  }

  const endpoint = ["https://api.", "web3forms", ".com/submit"].join("");

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("from_name", "NB-Events Kontaktformular");
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("subject", payload.subject);
  formData.append("message", payload.message);

  const res = await fetch(endpoint, { method: "POST", body: formData });
  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Senden fehlgeschlagen.");
  }
}
