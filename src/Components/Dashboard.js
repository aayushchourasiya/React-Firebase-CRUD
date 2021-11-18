import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row, Button } from "react-bootstrap";
import { db } from "../firebase-config";
import NavCom from "./NavCom";
import WorkCard from "./WorkCard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const userCollectionRef = collection(db, "users");
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(0);

  const [user, setUser] = useState({
    email: "",
    name: "",
    number: "",
  });

  let name, value;
  const fieldChange = (e) => {
    //instead of creating onChange functions for all fields, we are
    //getting the name of field which is changed and then saving its value using the below code.
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //passing and getting all values of the pressed button here!
  const editUser = async (id, email, name, number) => {
    console.log();
    setUser({
      email: email,
      name: name,
      number: number,
    });
    //we need the id of pressed button or data here so we created a state editId and passed id of button into it!
    setEditId(id);
    setEditModal(true);
  };
  const closeBFun = () => {
    setEditModal(false);
  };

  const saveEditData = async (e) => {
    e.preventDefault();
    //we need the id of pressed button or data here so we created a state editId and passed id of button into it!
    const userDoc = doc(db, "users", editId);
    const newFields = {
      name: user.name,
      number: user.number,
    };
    console.log(user);
    await updateDoc(userDoc, newFields); //for updating doc from database!
    setRefreshState((prev) => !prev);
    setEditModal(false);
    setUser({
      email: "",
      name: "",
      number: "",
    });
    alert("Saved!");
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc); //for deleting doc from database!
    setRefreshState((prev) => !prev);
    alert("Deleted!");
  };

  const refreshChangeForDelete = () => {
    setRefreshState((prev) => !prev);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef); //for getting docs from database!
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    // eslint-disable-next-line
  }, [refreshState]);

  return (
    <>
      <NavCom
        heading="Firebase Tutorial!"
        refreshStateChange={refreshChangeForDelete}
      />
      <Container>
        <Row>
          {users.map((item, index) => {
            return (
              <Col xs={3} key={index}>
                <WorkCard
                  cardTitle={item.name}
                  // body={"Email: " + item.email +"Number: " + item.number}
                  edit="Edit"
                  button="Delete"
                  changeButton={() => {
                    deleteUser(item.id);
                  }}
                  editButton={() => {
                    editUser(
                      item.id,
                      item.email,
                      item.name,
                      item.number,
                    );
                  }}
                >
                  {/*<WorkCard>{what we pass here, will be taken as props.children!}</WorkCard>*/}
                  Email: {item.email} <br /> Number: {item.number}
                </WorkCard>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Modal
        show={editModal}
        backdrop="static"
        keyboard={false}
        onHide={closeBFun}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveEditData}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email!"
                value={user.email}
                disabled
                required
              />
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
    </>
  );
}
