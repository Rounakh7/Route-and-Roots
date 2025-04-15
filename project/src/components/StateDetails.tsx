import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

// Import the state data from a separate file
import { stateData } from '../data/stateData.ts';

const StateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedPlaces');
    return saved ? JSON.parse(saved) : [];
  });

  const state = stateData[id as keyof typeof stateData];
  
  if (!state) return <div>State not found</div>;

  const handlePlaceSelection = (placeName: string) => {
    const newSelection = selectedPlaces.includes(placeName)
      ? selectedPlaces.filter(place => place !== placeName)
      : [...selectedPlaces, placeName];
    
    setSelectedPlaces(newSelection);
    localStorage.setItem('selectedPlaces', JSON.stringify(newSelection));
  };

  const estimatedDays = Math.ceil(selectedPlaces.length * 1.5);

  return (
    <Container className="py-5 mt-5">
      <h1 className="text-center mb-4">Exploring {id}</h1>
      
      {selectedPlaces.length > 0 && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Selected Places: {selectedPlaces.length}</h5>
            <div className="mb-2">
              {selectedPlaces.map(place => (
                <Badge bg="primary" className="me-2 mb-2" key={place}>
                  {place} <span onClick={() => handlePlaceSelection(place)} style={{cursor: 'pointer'}}>×</span>
                </Badge>
              ))}
            </div>
            <p>Estimated duration: {estimatedDays} days</p>
            <Button 
              variant="success" 
              onClick={() => navigate('/contact', { state: { selectedPlaces, estimatedDays } })}
            >
              Plan Your Trip
            </Button>
          </Card.Body>
        </Card>
      )}

      <Row xs={1} md={2} className="g-4">
        {state.places.map((place, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={place.image || 'https://images.unsplash.com/photo-1506461883276-594a12b827c3'} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {place.name}
                  <Button
                    variant={selectedPlaces.includes(place.name) ? "danger" : "primary"}
                    size="sm"
                    onClick={() => handlePlaceSelection(place.name)}
                  >
                    {selectedPlaces.includes(place.name) ? "Remove" : "Add to Trip"}
                  </Button>
                </Card.Title>
                <Card.Text>{place.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">{place.history}</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StateDetails;