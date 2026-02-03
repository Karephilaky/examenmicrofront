import styled from "styled-components";

const Container = styled.div`
  border: 2px solid #333;
  padding: 16px;
  border-radius: 8px;
`;

const Button = styled.button`
  margin: 6px;
  padding: 10px 14px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background: #222;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

export default function AlertSender() {
  const sendAlert = (type) => {
    const message =
      type === "exam"
        ? "Tienes un examen próximo"
        : type === "task"
        ? "Nueva tarea asignada"
        : "Clase cancelada";

    window.dispatchEvent(
      new CustomEvent("academic-alert", {
        detail: { type, message },
      })
    );
  };

  return (
    <Container>
      <h3>Alert Sender</h3>
      <Button onClick={() => sendAlert("exam")}>Examen</Button>
      <Button onClick={() => sendAlert("task")}>Tarea</Button>
      <Button onClick={() => sendAlert("cancel")}>Clase cancelada</Button>
    </Container>
  );
}
