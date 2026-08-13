import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation, useNavigate } from "react-router";

import { useUser } from "../context/UserContext.jsx";
import "../styles/NavigationBar.css";

export default function NavigationBar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPage = (path) =>
    location.pathname === path ? "page" : undefined;

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout");

      if (!response.ok) {
        console.error("Logout failed.");
        return;
      }

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Unable to log out:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="app-navbar"
      data-bs-theme="dark"
      aria-label="Main navigation"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" aria-current={isCurrentPage("/")}>
          FinTrip
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          aria-label="Toggle navigation menu"
        />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/about"
              aria-current={isCurrentPage("/about")}
            >
              About
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  aria-current={isCurrentPage("/dashboard")}
                >
                  Dashboard
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/trips"
                  aria-current={isCurrentPage("/trips")}
                >
                  My Trips
                </Nav.Link>

                <Nav.Link
                  as="button"
                  type="button"
                  onClick={handleLogout}
                  className="navbar-logout-button"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  aria-current={isCurrentPage("/login")}
                >
                  Login
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/register"
                  aria-current={isCurrentPage("/register")}
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
