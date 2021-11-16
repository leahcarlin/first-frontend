import React, { useState } from "react";
import { Container, Form, Col, Button, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveEntry } from "../../store/entries/actions";
import { gifRender, gifReset } from "../../store/user/actions";
import { selectGif, selectToken } from "../../store/user/selectors";
import "./Homepage.css";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

export default function Homepage() {
  const [sentiment, setSentiment] = useState("-");
  const token = useSelector(selectToken);
  // console.log("sentiment?", sentiment);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const showGif = useSelector(selectGif);
  // console.log(showGif);

  function handleSubmit() {
    if (sentiment === "-") alert("Please select an emotion");
    else {
      dispatch(gifRender(sentiment));
      setSentiment("-");
    }
  }

  function handleSave(content, gifUrl) {
    if (content === " ") alert("Please share your feelings");
    else {
      dispatch(saveEntry(content, gifUrl));
      dispatch(gifReset());
    }
  }

  const happy = [
    "confident",
    "happy",
    "optimistic",
    "relieved",
    "satisfied",
    "successful",
  ];
  const sad = ["alone", "anxious", "bored", "depressed", "sad", "pessimistic"];
  const angry = [
    "angry",
    "frustrated",
    "disappointed",
    "discouraged",
    "irritated",
    "violent",
  ];

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
      <Row>
        <h1>Developer's Diary</h1>
        <h3>Gif Mood Tracker</h3>
        <h4 className="mt-5 mb-5">
          Coding can make you feel many highs, lows and in-betweens.
        </h4>
        <b>
          <h5>How are you feeling today?</h5>
        </b>
      </Row>
      <Row>
        <Col>
          <select
            id="happy"
            name="happy"
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
          >
            <option value="-">?</option>
            <optgroup label="&#128578;">
              {happy.map((feeling) => (
                <option value={feeling}>{feeling}</option>
              ))}
            </optgroup>
            <optgroup label="&#128577;">
              {sad.map((feeling) => (
                <option value={feeling}>{feeling}</option>
              ))}
            </optgroup>
            <optgroup label="&#128544;">
              {angry.map((feeling) => (
                <option value={feeling}>{feeling}</option>
              ))}
            </optgroup>
          </select>
        </Col>
      </Row>
      <Form as={Col} className="mt-5" style={{ width: "600px" }}>
        <Form.Group controlId="formBasicContent">
          {token ? (
            <Form.Control
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="input"
              placeholder="Why do you feel this way?"
            />
          ) : null}
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Give me the GIF!
          </Button>
          {token ? (
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleSave(content, showGif)}
              style={{ marginLeft: "20px" }}
            >
              Save the GIF!
            </Button>
          ) : null}
        </Form.Group>
      </Form>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {!showGif ? null : (
          <div>
            <Image
              src={showGif}
              style={{
                marginTop: "20px",
                width: "600px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <FacebookShareButton url={showGif}>
                <FacebookIcon size={35} round={true} />
              </FacebookShareButton>
              <FacebookMessengerShareButton url={showGif}>
                <FacebookMessengerIcon size={35} round={true} />
              </FacebookMessengerShareButton>
              <TwitterShareButton url={showGif}>
                <TwitterIcon size={35} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton url={showGif}>
                <WhatsappIcon size={35} round={true} />
              </WhatsappShareButton>
              <EmailShareButton url={showGif}>
                <EmailIcon size={35} round={true} />
              </EmailShareButton>
            </div>
          </div>
        )}
      </Row>
    </Container>
  );
}
