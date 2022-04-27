import { faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, } from 'react';
import { Col, Container, Row, Form, InputGroup, Card, Modal, Button, Image, CloseButton } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { getAllProjects } from '../js/database';
import type { Project } from '../js/types';

function prepareDescription(description: string) {
  if (description.length > 100) description = description.substring(0, 100) + '...';
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
  const onAdd = () => {
    router.push({ pathname: `/new`, query: {} });
  };

  return (
    <Container>
      <div style={{ maxHeight: '30vh', marginBottom: '30px' }}>
        <Row>
          <Col>
            <h1>Project-Dashboard</h1>
          </Col>
        </Row>

        <Row >
          <Col sm='10' xs='10' md='10'>
            <InputGroup>
              <Form.Control placeholder='Search...' onChange={(e) => onChange(e.target.value.toLowerCase())} />
            </InputGroup>
          </Col>

          <Col sm='2' xs='2' md='2'>
            <Button onClick={onAdd}>
              <FontAwesomeIcon className='pointer' icon={faAdd} />
            </Button>
          </Col>
        </Row>
      </div>

      <SimpleBar forceVisible='y' autoHide={false} >
        <Row className='g-2'>
          {filteredProjects.map((project) => (
            <Col sm='12' md='6' lg='6' key={project.id}>
              <Card onClick={e => onProjectSelection(project)}>
                <Card.Body>
                  <Card.Title style={{ height: '27px' }}>
                    <Card.Img src={project.logo || undefined} style={{ margin: 'auto', textAlign: 'center', width: '24px' }} />
                    {' ' + project.title}
                  </Card.Title>

                  <Card.Text>{prepareDescription(project.description)}</Card.Text>
                </Card.Body>

                <Card.Footer style={{ height: '41px', overflow: 'hidden' }}>
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
            <Modal.Header style={{ height: '71px' }}>
              <Image src={selected.logo || undefined} width='38px' />
              <Modal.Title style={{ marginLeft: '10px' }}>{selected.title}</Modal.Title>
              <CloseButton variant='white' onClick={handleClose} />
            </Modal.Header>

            <Modal.Body>
              {selected.description}

              <div style={{ textAlign: 'center', marginTop: '10px' }} >
                <FontAwesomeIcon className='pointer' icon={faEdit} onClick={onEdit} />
              </div>
            </Modal.Body>

            <Modal.Footer style={{ height: '71px' }}>
              <small style={{ position: 'absolute', left: '0.75rem' }}>
                Version: {selected.version} <br />
                Status: &nbsp;
                <span style={{ color: selected.colorCode }}>
                  {selected.status}
                </span>
              </small>

              {!!selected.externalPath ?
                <Button variant='secondary' onClick={handleClose}>
                  <span>Goto&nbsp;</span>

                  <Link href={selected.externalPath}>
                    <b>{selected.title}</b>
                  </Link>
                </Button>
                : null}
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
