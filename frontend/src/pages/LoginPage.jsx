import { useState } from "react";
import { useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useUser } from "../context/UserContext.jsx";

export default function LoginPage() {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setSubmission] = useState(false);

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
            // After successfully logging in, update the shared UserContext
            setUser(data);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Cannot connect to the server at this time.");
        } finally {
            setSubmission(false);
        }
    };

    return (
        <section>
            <h1>Log In</h1>

            <p>Log in to view and manage your FinTrip travel plans.</p>

            {errorMessage && (
                <Alert variant="danger">{errorMessage}</Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="login-email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="login-password">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
            </Form>
        </section>
    );
}