import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import { Modal, CloseButton, Form, Button } from "react-bootstrap";
import { db } from "../firebase-config";

export function ModalShow(props) {
  const [user, setUser] = useState({
    email: "",
    name: "",
    number: "",
  });
  const userCollectionRef = collection(db, "users");
  const saveData = async (e) => {
    e.preventDefault();
    await addDoc(userCollectionRef, user);
    setUser({ email: "", name: "", number: ""});
    alert("Success!");
    props.closeB();
    props.refreshStateChange();
  };

  let name, value;
  const fieldChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <Modal show={props.show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{props.heading}</Modal.Title>
        <CloseButton onClick={props.closeB}></CloseButton>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email!"
              value={user.email}
              onChange={fieldChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name!"
              value={user.name}
              onChange={fieldChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              name="number"
              placeholder="Enter number!"
              value={user.number}
              onChange={fieldChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
