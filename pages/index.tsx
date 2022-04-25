import type { NextPage } from 'next';
import { useState, } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Modal, Button, Image } from "react-bootstrap";
import SimpleBar from 'simplebar-react';
import loadData from "../lib/test";

const PROJECT_STATUS = {
  STABLE: { colorCode: "#88a28b", status: "STABLE" },
  IDEA: { colorCode: "#ebc57e", status: "IDEA" },
  ON_HOLD: { colorCode: "#7f7f7f ", status: "ON HOLD" },
  DISCARDED: { colorCode: "#b3533a", status: "DISCARDED" },
};

const projects: Project[] = [
  {
    id: 1,
    title: `OneWord`,
    description: `A simple password-manager.`,
    logo: "oneWord.svg",
    version: `0.0.1`,
    status: "ON_HOLD",
  },
  {
    id: 2,
    title: `RC-Manager`,
    description: `A tool to manage everything for your RC-experience.
Get yourself an overview of all your LiPo's, PID-tuning, rates, etc.`,
    logo: null,
    version: `0.0.0`,
    status: "IDEA",
  },
];

type Project = {
  id: number,
  title: string,
  description: string,
  logo: string | null,
  version: string,
  status: keyof typeof PROJECT_STATUS,
};

function prepareDescription(description: string) {
  if (description.length > 100) description = description.substring(0, 100) + "...";
  return description;
}

const Dashboard: NextPage<{ posts: string }> = (props) => {
  console.log(props.posts);

  const [filteredProjects, setFilteredProjects] = useState([...projects]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const handleClose = () => setShow(false);
  const onProjectSelection = (project: Project) => {
    setSelected(project);
    setShow(true);
  }
  const onChange = (search: string) => setFilteredProjects(
    projects.filter(
      (project) => project.description.toLowerCase().includes(search) || project.title.toLowerCase().includes(search)
    )
  );

  return (
    <Container>
      <div style={{ maxHeight: "30vh", marginBottom: "30px" }}>
        <Row >
          <Col>
            <h1>Project-Dashboard</h1>
          </Col>
        </Row>

        <Row >
          <Col>
            <InputGroup>
              <Form.Control placeholder="Search..." onChange={(e) => onChange(e.target.value.toLowerCase())} />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <SimpleBar forceVisible="y" autoHide={false} >
        <Row className="g-2" >
          {filteredProjects.map((project) => (
            <Col sm={6} md={6} key={project.id}>
              <Card onClick={e => onProjectSelection(project)}>
                <Card.Body>
                  <Card.Title>
                    <Card.Img src={project.logo || undefined} style={{ margin: "auto", textAlign: "center", width: "50px" }} />
                    {" " + project.title}
                  </Card.Title>

                  <Card.Text>{prepareDescription(project.description)}</Card.Text>
                </Card.Body>

                <Card.Footer>
                  <Row>
                    <Col>
                      <small>Version: {project.version}</small>
                    </Col>
                    <Col>
                      <small>Status: &nbsp;
                        <span style={{ color: PROJECT_STATUS[project.status].colorCode }}>
                          {(PROJECT_STATUS[project.status] || {}).status}
                        </span>
                      </small>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </SimpleBar>

      <Modal show={show} onHide={handleClose}>
        {!!selected ?
          <>
            <Modal.Header closeButton>
              <Image src={selected.logo || undefined} width="50px" />
              <Modal.Title style={{ marginLeft: "10px" }}>{selected.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selected.description}
            </Modal.Body>

            <Modal.Footer>
              <small style={{ position: "absolute", left: "0.75rem" }}>
                Version: {selected.version} <br />
                Status: <span style={{ color: (PROJECT_STATUS[selected.status] || {}).colorCode }}>{(PROJECT_STATUS[selected.status] || {}).status}</span>
              </small>

              <Button variant="secondary" onClick={handleClose}>
                Goto <b>{selected.title}</b>
              </Button>
            </Modal.Footer>
          </>
          : null}
      </Modal>
    </Container >
  );
}

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const posts = await loadData();

  // Props returned will be passed to the page component
  return { props: { posts } }
}

export default Dashboard
