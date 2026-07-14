import NavigationBar from "../components/NavigationBar.jsx";
import Container from "react-bootstrap/Container";
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
          setUser(data.user);
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
    <UserContext.Provider value={user}>
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
