import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Modal, Button, Image } from "react-bootstrap";
import SimpleBar from 'simplebar-react';
import { getAllProjects, getProjectStatus } from "../js/database";

export type ProjectStatus = {
  id: string,
  status: string,
  colorCode: string,
};

export type Project = {
  id: number,
  title: string,
  description: string,
  logo: string | null,
  version: string,
  status: string,
  statusId: string,
  colorCode: string,
};

function prepareDescription(description: string) {
  if (description.length > 100) description = description.substring(0, 100) + "...";
  return description;
}

const Dashboard: NextPage = (props: any) => {
  const PROJECTS: Project[] = props.PROJECTS || [];
  const router = useRouter();
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const handleClose = () => setShow(false);
  const onProjectSelection = (project: Project) => {
    setSelected(project);
    setShow(true);
  }
  const onChange = (search: string) => setFilteredProjects(
    PROJECTS.filter(
      (project) => project.description.toLowerCase().includes(search) || project.title.toLowerCase().includes(search)
    )
  );
  const onEdit = () => {
    router.push({ pathname: `/edit`, query: { id: (selected || {}).id } });
  };

  return (
    <Container>
      <div style={{ maxHeight: "30vh", marginBottom: "30px" }}>
        <Row>
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
        <Row className="g-2">
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
                        <span style={{ color: project.colorCode }}>
                          {project.status}
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

              <div style={{ textAlign: "center", marginTop: "10px" }} >
                <FontAwesomeIcon className="pointer" icon={faEdit} onClick={onEdit} />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <small style={{ position: "absolute", left: "0.75rem" }}>
                Version: {selected.version} <br />
                Status: &nbsp;
                <span style={{ color: selected.colorCode }}>
                  {selected.status}
                </span>
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

export async function getServerSideProps() {
  const PROJECTS: Project[] = await getAllProjects();

  return {
    props: { PROJECTS },
  }
}

export default Dashboard
