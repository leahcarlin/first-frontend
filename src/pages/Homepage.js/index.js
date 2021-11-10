import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

export default function Homepage() {
  const [content, setContent] = useState("Today, I'm feeling ");
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <h1>Developer's Diary</h1>
      <h3>Gif Mood Tracker</h3>
      <h4 className="mt-5 mb-5">
        Coding can make you feel many highs, lows and in-betweens.
      </h4>
      <b>
        <h5>How are you feeling today?</h5>
      </b>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <Form.Group controlId="formBasicContent">
          <Form.Control
            value={content}
            onChange={(event) => setContent(event.target.value)}
            type="input"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit">
            Give me the GIF!
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
