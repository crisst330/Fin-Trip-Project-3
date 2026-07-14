import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBackendStatus = async () => {
      try {
        const response = await fetch("/api/health");

        if (!response.ok) {
          throw new Error("The backend returned an error.");
        }
        
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError(err.message);
      }
    };

    loadBackendStatus();
  }, []);

  return (
    <section>
      <h1>FinTrip Dashboard</h1>
      <p>
        Plan trips by comparing projected expenses against a defined budget you set!
      </p>
      {message ? (
        <Alert variant="success" className="mt-4">
          {message}
        </Alert>
      ) : error ? (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      ) : (
        <Spinner animation="border" className="mt-4" />
      )}
    </section>
  );
}