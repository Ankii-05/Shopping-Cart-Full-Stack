import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style/Footer.css";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { LiaYoutube } from "react-icons/lia";
import { PiInstagramLogo } from "react-icons/pi";
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm={6} lg={3} className="text-center mb-4">
            <h5>Location</h5>
            <p>Gwalior</p>
            <p>Madhya Pradesh</p>
          </Col>
          <Col sm={6} lg={3} className="text-center mb-4">
            <h5>Working Hours</h5>
            <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: 12:00 PM - 4:00 PM</p>
          </Col>
          <Col sm={6} lg={3} className="text-center mb-4">
            <h5>Order Now</h5>
            <p>Our Team Helps You</p>
            <p>
              <Link to="tel:9755416219" className="calling">
                9755416219
              </Link>
            </p>
          </Col>
          <Col sm={6} lg={3} className="text-center mb-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-center gap-3 mt-2">
              <li><Link to="/"><i><CiTwitter /></i></Link></li>
              <li><Link to="/"><i><CiFacebook /></i></Link></li>
              <li><Link to="/"><i><PiInstagramLogo /></i></Link></li>
              <li><Link to="/"><i><LiaYoutube /></i></Link></li>
              
            </ul>
          </Col>
        </Row>
        <Row className="copy_right">
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
