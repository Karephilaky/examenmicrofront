import { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  color: white;
  background-color: ${({ type }) =>
    type === "exam"
      ? "#1e90ff"
      : type === "task"
      ? "#2ecc71"
      : type === "cancel"
      ? "#e74c3c"
      : "#555"};
`;

export default function AlertDashboard() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setAlert(event.detail);
    };

    window.addEventListener("academic-alert", handler);

    return () => {
      window.removeEventListener("academic-alert", handler);
    };
  }, []);

  return (
    <div>
      <h3>Alert Dashboard</h3>
      {alert ? (
        <Box type={alert.type}>
          <strong>{alert.type.toUpperCase()}</strong>
          <p>{alert.message}</p>
        </Box>
      ) : (
        <p>No hay alertas activas</p>
      )}
    </div>
  );
}
