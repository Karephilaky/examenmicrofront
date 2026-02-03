import React, { Suspense } from "react";

const AlertSender = React.lazy(() => import("alert_sender/AlertSender"));
const AlertDashboard = React.lazy(() =>
  import("alert_dashboard/AlertDashboard")
);

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Sistema de Alertas Académicas</h2>

      <Suspense fallback={<p>Cargando Alert Sender...</p>}>
        <AlertSender />
      </Suspense>

      <Suspense fallback={<p>Cargando Alert Dashboard...</p>}>
        <AlertDashboard />
      </Suspense>
    </div>
  );
}
