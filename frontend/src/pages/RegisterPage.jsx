import { useState } from "react";
import { useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import registerImage from "../assets/dashboard/hero_banner.png";

import "../styles/RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Unable to register at this time.");
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Cannot connect to the server at this time.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register-page">
      <section
        className="register-card"
        aria-labelledby="register-heading"
      >
        <div className="register-visual">
          <img
            src={registerImage}
            alt=""
            className="register-visual-image"
          />

          <div className="register-visual-overlay">
            <p className="register-brand">FinTrip</p>

            <h2>
              Start Planning.
              <span> Travel Smarter.</span>
            </h2>

            <p>
              Create your FinTrip account and keep your trips, budgets, and
              expenses organized in one place.
            </p>
          </div>
        </div>

        <div className="register-form-panel">
          <div
            className="register-heading-accent"
            aria-hidden="true"
          />

          <h1 id="register-heading">Create Your Account</h1>

          <p className="register-intro">
            Sign up to start planning trips and managing your travel budget.
          </p>

          {errorMessage && (
            <Alert variant="danger" role="alert">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="register-name"
            >
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="register-email"
            >
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-4"
              controlId="register-password"
            >
              <Form.Label>Password</Form.Label>

              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

              <Button
                type="button"
                variant="link"
                className="register-password-toggle"
                aria-pressed={showPassword}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </Button>
            </Form.Group>

            <Button
              type="submit"
              className="register-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating an account..."
                : "Create Account"}
            </Button>
          </Form>
        </div>
      </section>
    </main>
  );
}