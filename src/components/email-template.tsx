type Props = {
  name: string;
  email: string;
  message: string;
};

export default function EmailTemplate({ name, email, message }: Props) {
  return (
    <div>
      <h1>Neue Kontaktformular-Einsendung</h1>
      <p>
        Sie haben eine neue Nachricht über das Kontaktformular Ihrer Website
        erhalten.
      </p>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>E-Mail:</strong> {email}
      </div>
      <div style={{ marginTop: "16px" }}>
        <strong>Nachricht:</strong>
        <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
      </div>
      <hr />
      <p>Diese E-Mail wurde über das Kontaktformular Ihrer Website gesendet.</p>
    </div>
  );
}
