// import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    title: 'South Indian Trip',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Experience the rich culture and traditions of South India',
    region: 'south',
    features: [
      'Traditional accommodations',
      'Local cuisine experiences',
      'Temple visits',
      'Cultural performances'
    ]
  },
  {
    title: 'North Indian Trip',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Explore the majestic landscapes of North India',
    region: 'north',
    features: [
      'Luxury hotels',
      'Royal palace visits',
      'Desert safaris',
      'Mountain expeditions'
    ]
  },
  {
    title: 'Customized Trip',
    image: 'https://plus.unsplash.com/premium_photo-1733259798187-63fae76b898b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXl0aG9sb2dpY2FsJTIwcGxhY2VzfGVufDB8fDB8fHww',
    description: 'Design your perfect Indian adventure',
    region: 'all', // For customized trip, show all states
    features: [
      'Personalized itinerary',
      'Flexible accommodation options',
      'Custom activities',
      'Local guide services'
    ]
  }
];

const Packages = () => {
  const navigate = useNavigate();

  const handleCardClick = (region: string) => {
    navigate(`/states?region=${region}`);
  };

  return (
    <Container className="py-5 mt-5">
      <h1 className="text-center mb-5">Travel Packages</h1>
      <Row xs={1} md={3} className="g-4">
        {packages.map((pkg, idx) => (
          <Col key={idx}>
            <Card
              className="package-card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(pkg.region)}
            >
              <Card.Img variant="top" src={pkg.image} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{pkg.title}</Card.Title>
                <Card.Text>{pkg.description}</Card.Text>
                <ul className="list-unstyled">
                  {pkg.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Packages;
