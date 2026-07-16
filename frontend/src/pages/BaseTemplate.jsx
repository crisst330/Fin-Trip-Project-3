import NavigationBar from "../components/NavigationBar.jsx";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function BaseTemplate({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Container>
        <NavigationBar />
        {children}
        <footer className="text-center mt-5">
          <hr />
          <p>
            &copy; {new Date().getFullYear()} FinTrip by Timothy Criss Jr &
            Priamos Koumas. All rights reserved.
          </p>
        </footer>
      </Container>
    </UserContext.Provider>
  );
}

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
