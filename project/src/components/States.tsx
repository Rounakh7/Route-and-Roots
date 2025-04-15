// import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const states = {
  north: [
    'Rajasthan', 'Uttar Pradesh', 'Uttarakhand', 'Maharashtra', 'Madhya Pradesh',
    'Chhattisgarh', 'Gujarat', 'Punjab', 'Haryana', 'Delhi', 'Himachal Pradesh'
  ],
  south: [
    'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'
  ],
  east: [
    'West Bengal', 'Bihar', 'Jharkhand', 'Odisha', 'Assam', 'Sikkim'
  ]
};

const getStateImage = (state: string) => {
  const images: { [key: string]: string } = {
    'Rajasthan': 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
    'Kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    'Tamil Nadu': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
    'Uttar Pradesh': 'https://images.unsplash.com/photo-1713690847764-48bbcd865fb0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Uttarakhand': 'https://media.istockphoto.com/id/963375682/photo/mountain-scenery.jpg?s=1024x1024&w=is&k=20&c=aLDapYTOxsuMgEnHfigm8IdTlkM_SFp6VQhOm2vfb5g=',
    'Maharashtra': 'https://images.unsplash.com/photo-1679294328210-f82d5dfeda3b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Madhya Pradesh': 'https://plus.unsplash.com/premium_photo-1691031429919-2273f9603be6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Chhattisgarh': 'https://images.unsplash.com/photo-1701006516979-7bce07e1a5bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Karnataka':'https://thrillingtravel.in/wp-content/uploads/2021/05/Chariot-udupi-krishna-matha.jpg',
    'Andhra Pradesh': 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
    'Telangana': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSGgqwhaj8rxd3gFZmPcpzJi0Z5xbPikLhcA&s',
    'Gujarat': 'https://images.unsplash.com/photo-1585765687665-427ec8513a7b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VqYXJhdHxlbnwwfHwwfHx8MA%3D%3D',
    'Punjab': 'https://plus.unsplash.com/premium_photo-1697730324062-c012bc98eb13?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Haryana': 'https://plus.unsplash.com/premium_photo-1661963629241-52c812d5c7f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhcnlhbmF8ZW58MHx8MHx8fDA%3D',
    'Delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D',
    'Himachal Pradesh': 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGltYWNoYWwlMjBwcmFkZXNofGVufDB8fDB8fHww',
    'West Bengal': 'https://images.unsplash.com/photo-1603813507806-0d311a6eecd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VzdCUyMGJlbmdhbHxlbnwwfHwwfHx8MA%3D%3D',
    'Bihar': 'https://plus.unsplash.com/premium_photo-1697730291496-f1ed760a5f1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmloYXJ8ZW58MHx8MHx8fDA%3D',
    'Jharkhand': 'https://images.unsplash.com/photo-1619500765355-8ba767d6e261?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amhhcmtoYW5kfGVufDB8fDB8fHww',
    'Odisha': 'https://plus.unsplash.com/premium_photo-1689838025843-505c76187c4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8T2Rpc2hhfGVufDB8fDB8fHww',
    'Assam': 'https://images.unsplash.com/photo-1604236240998-8b596457baef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFzc2FtfGVufDB8fDB8fHww',
    'Sikkim': 'https://images.unsplash.com/photo-1634400001131-d04275db2076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2lra2ltfGVufDB8fDB8fHww'




    // Add more state images here
  };
  return images[state] || 'https://images.unsplash.com/photo-1506461883276-594a12b827c3';
};

const States = () => {
  const navigate = useNavigate();
  const region = new URLSearchParams(window.location.search).get('region') || 'all';

  const filteredStates = region === 'all' 
    ? [...states.north, ...states.south, ...states.east]
    : states[region as keyof typeof states] || [];

  return (
    <Container className="py-5 mt-5">
      <h1 className="text-center mb-5">
        {region === 'all' ? 'All States' : `${region.charAt(0).toUpperCase() + region.slice(1)} Indian States`}
      </h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredStates.map((state) => (
          <Col key={state}>
            <Card className="state-card h-100" onClick={() => navigate(`/state/${state}`)}>
              <Card.Img 
                variant="top" 
                src={getStateImage(state)} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{state}</Card.Title>
                <Card.Text>
                  Explore the spiritual heritage of {state}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default States;