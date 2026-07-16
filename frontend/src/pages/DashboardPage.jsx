import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import heroImg from "../../images/financetrip.jpg";
import "./DashboardPage.css";
export default function DashboardPage() {
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBackendStatus = async () => {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error("The backend returned an error.");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    loadBackendStatus();
  }, []);

  return (
    <section className="hero-section">
      <img src={heroImg} alt="World map with money" className="hero-bg-img" />
      <h1>Welcome to FinTrip</h1>
      <p>
        Plan trips by comparing projected expenses against a defined budget you
        set!
      </p>
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}
    </section>
  );
}
