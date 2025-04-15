import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

type FormData = {
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  startDate: string;
  numberOfPeople: string;
  tripType: string;
  accommodationType: string;
  message: string;
};

const Contact: React.FC = () => {
  const location = useLocation();
  const { selectedPlaces = [], estimatedDays = 0 } = location.state || {};

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferredContact: '',
    startDate: '',
    numberOfPeople: '1',
    tripType: '',
    accommodationType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      preferred_contact: formData.preferredContact,
      start_date: formData.startDate,
      people_count: formData.numberOfPeople,
      trip_type: formData.tripType,
      accommodation: formData.accommodationType,
      message: formData.message,
      selected_places: selectedPlaces.join(', '),
      estimated_days: estimatedDays,
    };

    // 1️⃣ Send email to Admin
    emailjs.send(
      'service_wwu9j8n',         // ✅ Your EmailJS Service ID
      'template_3i9ny2v',       // ✅ Template to send to admin
      {
        ...templateParams,
        to_email: 'abdulrounakh15@gmail.com', // ✅ Admin email
      },
      'eVngOtK4NenYs1EIP'         // ✅ Your Public Key
    ).then(
      () => {
        console.log('Email sent to admin ✅');
      },
      (error) => {
        console.error('Error sending to admin:', error.text);
      }
    );

    // 2️⃣ Send confirmation to Client (Welcome Email)
    emailjs.send(
      'service_wwu9j8n',
      'template_ji9i3uh',      // ✅ Separate client confirmation template
      {
        ...templateParams,
        to_email: formData.email, // ✅ Client email from input
      },
      'eVngOtK4NenYs1EIP'
    ).then(
      () => {
        alert('✅ Thank you! Your inquiry has been sent.');
      },
      (error) => {
        console.error('Error sending to client:', error.text);
        alert('❌ Something went wrong. Please try again.');
      }
    );
  };

  return (
    <Container className="py-5 mt-5">
      <h1 className="text-center mb-5">Book Your Spiritual Journey</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5>Selected Places</h5>
              <ul>
                {selectedPlaces.map((place: string) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
              <p>Estimated duration: {estimatedDays} days</p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preferred Contact Method</Form.Label>
                  <Form.Select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preferred Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Number of People</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={formData.numberOfPeople}
                    onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trip Type</Form.Label>
                  <Form.Select
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  >
                    <option value="">Select trip type</option>
                    <option value="solo">Solo</option>
                    <option value="family">Family</option>
                    <option value="custom">Friend</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Accommodation Type</Form.Label>
                  <Form.Select
                    value={formData.accommodationType}
                    onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                    required
                  >
                    <option value="">Select accommodation type</option>
                    <option value="budget">Premium Hotels</option>
                    <option value="standard">Standard Hotels</option>
                    <option value="luxury">Luxury Hotels</option>
                    <option value="ashram">Ashram Stay</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit Inquiry
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Contact Information</h4>
              <div className="d-flex align-items-center mb-3">
                <MapPin className="me-2" />
                <span>Kalasalingam University, Madurai, India</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <Phone className="me-2" />
                <span>+91 9835568291</span>
              </div>
              <div className="d-flex align-items-center">
                <Mail className="me-2" />
                <span>abdulrounakh15@gmail.com</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
