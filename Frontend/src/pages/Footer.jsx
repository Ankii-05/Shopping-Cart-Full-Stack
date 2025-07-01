import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {


  return (
      <footer >
        <Container className="mt-4">
          <Row>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <h5>Location</h5>
                <p>Gwalior </p>
                <p>Madhya Pradesh</p>
                
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <h5>Working Hours</h5>
                <p>Mon-Fri: 9:00 AM  - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: 12:00 PM - 4:00 PM</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <h5>Order Now</h5>
                <p>Our Team Helps You</p>
                <p>
                  <Link to="tel:9755416219" className="calling">
                    9755416219
                  </Link>
                </p>
              </div>
            </Col>
            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <div className="text-center">
                <h5>Follow Us</h5>
                <p>These are platforms</p>
                <ul className="list-unstyled text-center mt-2">
                  <li>
                    <Link to="/">
                      <i className="bi bi-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="bi bi-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" >
                      <i className="bi bi-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="copy_right">
            <Col>
              <div>
                <ul className="list-unstyled text-center mb-0">
                  <li>
                    <Link to="/" className="text-decoration-none p-2"> 
                      &copy; 2025 All Rights Reserved
                    </Link>
                    </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    
  );
}

export default Footer;
