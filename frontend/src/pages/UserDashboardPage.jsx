import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import { useUser } from "../context/UserContext.jsx";
import { formatCurrency } from "../utils/currency.js";

import heroBanner from "../assets/dashboard/hero_banner.png";
import backpackImg from "../assets/dashboard/backpack_card.png";
import walletImg from "../assets/dashboard/wallet_card.png";
import signpostImg from "../assets/dashboard/signpost_card.png";
import adventureImg from "../assets/dashboard/adventure_card.png";

import "../styles/UserDashboardPage.css";

export default function UserDashboardPage() {
  const { user } = useUser();

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadTrips = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/trips");

        if (!response.ok) {
          throw new Error("Unable to load dashboard data.");
        }

        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Dashboard trip loading error:", error);
        setErrorMessage("Unable to load your dashboard information.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTrips();
  }, [user]);

  const totalTrips = trips.length;

  const totalBudget = trips.reduce(
    (total, trip) => total + Number(trip.budgetCap || 0),
    0,
  );

  const totalExpenses = trips.reduce(
    (total, trip) => total + (trip.items?.length || 0),
    0,
  );

  const totalSpent = trips.reduce((tripTotal, trip) => {
    const tripExpenses =
      trip.items?.reduce(
        (expenseTotal, item) => expenseTotal + Number(item.cost || 0),
        0,
      ) || 0;

    return tripTotal + tripExpenses;
  }, 0);

  const dashboardTrips = trips.slice(0, 3);

  return (
    <section className="user-dashboard">
      <header className="dashboard-hero">
        <img src={heroBanner} alt="" className="dashboard-hero-image" />

        <div className="dashboard-hero-content">
          <p className="dashboard-welcome">
            Welcome back, <strong>{user?.name}</strong>!
          </p>

          <p className="dashboard-hero-text">
            Your travel plans are all in one place. Track budgets, monitor
            expenses, and start planning your next adventure.
          </p>

          <div className="dashboard-actions">
            <Button as={Link} to="/trips" className="dashboard-primary-button">
              View My Trips
            </Button>

            <Button
              as={Link}
              to="/trips"
              className="dashboard-secondary-button"
            >
              Create Trip
            </Button>
          </div>
        </div>
      </header>

      {errorMessage && (
        <p className="dashboard-error" role="alert">
          {errorMessage}
        </p>
      )}

      <section
        aria-labelledby="dashboard-summary-heading"
        className="dashboard-section"
      >
        <h2
          id="dashboard-summary-heading"
          className="dashboard-section-heading"
        >
          Your Travel Snapshot
        </h2>

        {isLoading ? (
          <p>Loading your travel summary...</p>
        ) : (
          <Row className="g-3">
            <Col lg={3} sm={6} xs={12}>
              <Card className="dashboard-stat-card dashboard-stat-purple">
                <Card.Body>
                  <Card.Title as="h3">Trips Created</Card.Title>
                  <p className="dashboard-stat-value">{totalTrips}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} sm={6} xs={12}>
              <Card className="dashboard-stat-card dashboard-stat-green">
                <Card.Body>
                  <Card.Title as="h3">Total Budget</Card.Title>
                  <p className="dashboard-stat-value">
                    {formatCurrency(totalBudget)}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} sm={6} xs={12}>
              <Card className="dashboard-stat-card dashboard-stat-tan">
                <Card.Body>
                  <Card.Title as="h3">Expenses Logged</Card.Title>
                  <p className="dashboard-stat-value">{totalExpenses}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} sm={6} xs={12}>
              <Card className="dashboard-stat-card dashboard-stat-red">
                <Card.Body>
                  <Card.Title as="h3">Total Spent</Card.Title>
                  <p className="dashboard-stat-value">
                    {formatCurrency(totalSpent)}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </section>

      <section
        aria-labelledby="dashboard-features-heading"
        className="dashboard-section"
      >
        <h2
          id="dashboard-features-heading"
          className="dashboard-section-heading"
        >
          Quick Actions
        </h2>

        <Row className="g-3">
          <Col lg={3} sm={6} xs={12}>
            <Card className="dashboard-feature-card">
              <img
                src={backpackImg}
                alt=""
                className="dashboard-feature-image"
              />

              <Card.Body>
                <Card.Title as="h3">Plan Trips</Card.Title>

                <Card.Text>Create and manage your travel itinerary.</Card.Text>

                <Button
                  as={Link}
                  to="/trips"
                  className="dashboard-feature-button"
                >
                  Create Trip
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} sm={6} xs={12}>
            <Card className="dashboard-feature-card">
              <img src={walletImg} alt="" className="dashboard-feature-image" />

              <Card.Body>
                <Card.Title as="h3">Track Budget</Card.Title>

                <Card.Text>
                  Monitor trip budgets and spending in one place.
                </Card.Text>

                <Button
                  as={Link}
                  to="/trips"
                  className="dashboard-feature-button"
                >
                  Track Budget
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} sm={6} xs={12}>
            <Card className="dashboard-feature-card">
              <img
                src={signpostImg}
                alt=""
                className="dashboard-feature-image"
              />

              <Card.Body>
                <Card.Title as="h3">Add Expenses</Card.Title>

                <Card.Text>
                  Open a trip and add estimated or booked expenses.
                </Card.Text>

                <Button
                  as={Link}
                  to="/trips"
                  className="dashboard-feature-button"
                >
                  Add Expenses
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} sm={6} xs={12}>
            <Card className="dashboard-feature-card">
              <img
                src={adventureImg}
                alt=""
                className="dashboard-feature-image"
              />

              <Card.Body>
                <Card.Title as="h3">Explore More</Card.Title>

                <Card.Text>
                  Review your saved trips and keep planning your next adventure.
                </Card.Text>

                <Button
                  as={Link}
                  to="/trips"
                  className="dashboard-feature-button"
                >
                  View My Trips
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section
        aria-labelledby="dashboard-trips-heading"
        className="dashboard-section"
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2
            id="dashboard-trips-heading"
            className="dashboard-section-heading mb-0"
          >
            Your Trips
          </h2>

          <Button
            as={Link}
            to="/trips"
            variant="outline-primary"
            className="dashboard-view-button"
          >
            View All Trips
          </Button>
        </div>

        {!isLoading && trips.length === 0 ? (
          <p>
            You do not have any trips yet. Start planning your first adventure.
          </p>
        ) : (
          <Row className="g-3">
            {dashboardTrips.map((trip) => (
              <Col lg={4} md={6} xs={12} key={trip._id}>
                <Card className="dashboard-trip-card">
                  <Card.Body>
                    <Card.Title as="h3">{trip.name}</Card.Title>

                    <Card.Text>
                      <strong>Destination:</strong> {trip.destination}
                    </Card.Text>

                    <Card.Text>
                      <strong>Budget:</strong> {formatCurrency(trip.budgetCap)}
                    </Card.Text>

                    <Card.Text>
                      <strong>Travelers:</strong> {trip.travelers}
                    </Card.Text>

                    <Button
                      as={Link}
                      to={`/trips/${trip._id}`}
                      variant="outline-primary"
                      className="dashboard-view-button"
                    >
                      View Trip
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </section>
  );
}
