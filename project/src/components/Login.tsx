import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig'; // adjust path if needed
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Try to login user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        lastLogin: new Date().toISOString(),
      });

      navigate('/Packages');
    } catch (loginError) {
      // If login fails, try to register the user
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        alert('Account created successfully!');
        navigate('/Packages');
      } catch (signupError: any) {
        console.error('Error:', signupError.message);
        alert('Login/Register failed. Please check your credentials.');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      return alert('Please enter your email first.');
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent to your email.');
    } catch (err: any) {
      console.error(err.message);
      alert('Failed to send password reset link.');
    }
  };

  return (
    <div className="hero-section">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <Card.Body className="p-4">

            <h2 className="text-center mb-3 text-dark">Welcome to RNR India Travel Guide</h2>
            <p className="text-center text-muted mb-4">Login or register to continue your journey!</p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mb-3"
              />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="link" className="p-0 text-primary" onClick={handleForgotPassword}>
                  Forgot Password?
                </Button>
              </div>

              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
