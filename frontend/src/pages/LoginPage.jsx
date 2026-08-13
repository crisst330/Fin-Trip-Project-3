import { useState } from "react";
import { useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useUser } from "../context/UserContext.jsx";
import loginImage from "../assets/dashboard/hero_banner.png";

import "../styles/LoginPage.css";

export default function LoginPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmission] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSubmission(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Unable to login at this time.");
        return;
      }

      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Cannot connect to the server at this time.");
    } finally {
      setSubmission(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-visual">
          <img src={loginImage} alt="" className="login-visual-image" />

          <div className="login-visual-overlay">
            <p className="login-brand">FinTrip</p>

            <h2>
              Plan More.
              <span> Worry Less.</span>
            </h2>

            <p>
              Keep your trips, budgets, and expenses organized in one place.
            </p>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-heading-accent" aria-hidden="true" />

          <h1 id="login-heading">Welcome Back</h1>

          <p className="login-intro">
            Log in to continue planning and managing your FinTrip adventures.
          </p>

          {errorMessage && (
            <Alert variant="danger" role="alert">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="login-email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="login-password">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <Button
                type="button"
                variant="link"
                className="login-password-toggle"
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </Button>
            </Form.Group>

            <Button
              type="submit"
              className="login-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </Form>
        </div>
      </section>
    </main>
  );
}
