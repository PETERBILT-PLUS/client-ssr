import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Container, Row, Col } from 'react-bootstrap';

const SuperAdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalMoneyToTake: '0 USD', // Money to keep (agencies with reservations)
    totalMoneyToRefund: '0 USD', // Money to refund (agencies without reservations)
  });
  const SERVER: string = import.meta.env.VITE_SERVER as string;

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${SERVER}/super-admin/get-analytics`); // Replace with your API endpoint
        setAnalyticsData(response.data.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Super Admin Analytics</h1>

      {/* Key Metrics Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Money to Keep</Card.Title>
              <Card.Text>{analyticsData.totalMoneyToTake}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Money to Refund</Card.Title>
              <Card.Text>{analyticsData.totalMoneyToRefund}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SuperAdminAnalytics;