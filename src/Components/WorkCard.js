import { Card, Button } from "react-bootstrap";

export default function WorkCard(props) {
  return (
    <Card style={{ width: "auto" }} className="bg-light text-dark my-2">
      <Card.Header
        style={{ textAlign: "center" }}
        className={"bg-primary text-light"}
      >
        {props.cardTitle}
      </Card.Header>
      {/*<WorkCard>{what we pass here, will be taken as props.children!}</WorkCard>*/}
      <Card.Body style={{ height: "auto" }}>{props.children}</Card.Body>
      {/* <Card.Body style={{ height: "auto" }}>{props.body}</Card.Body> */}
      <Button variant="secondary" className="my-1" onClick={props.editButton}>{props.edit}</Button>
      <Button variant="danger" onClick={props.changeButton}>{props.button}</Button>
    </Card>
  );
}
