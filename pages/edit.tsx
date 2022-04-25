import type { NextPage, NextApiRequest } from 'next';
import { useState, } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Modal, Button, Image, DropdownButton, Dropdown } from "react-bootstrap";
import SimpleBar from 'simplebar-react';
import type { Project, ProjectStatus } from './index';
import { getProjectById, getAllProjects, getProjectStatus, updateProject } from "../js/database";
import { NextRouter, useRouter } from 'next/router';

function routeHome(router: NextRouter) {
    router.push({
        pathname: "/",
    });
}

function findStatusColor(id: string, status: ProjectStatus[]) {
    return (status.find(s => s.id == id) || {}).colorCode || 'black';
}

const Edit: NextPage = (props: any) => {
    const PROJECT: Project = { ...props.PROJECT };
    const PROJECT_STATUS: ProjectStatus[] = [...props.PROJECT_STATUS];
    const router = useRouter();

    const [title, setTitle] = useState(PROJECT.title);
    const [description, setDescription] = useState(PROJECT.description);
    const [version, setVersion] = useState(PROJECT.version);
    const [status, setStatus] = useState(PROJECT.statusId);

    const onCancel = () => routeHome(router);
    const onSave = () => {
        const project = { ...PROJECT, title, description, version, status };
        // updateProject(project);
        routeHome(router);
    };

    return (
        <Container>
            <div style={{ padding: "25px", marginBottom: "10px" }}>
                <h1>Editing "{PROJECT.title}":</h1>
            </div>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Title
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control value={title} placeholder="..." onChange={e => setTitle(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control as="textarea" rows={2} value={description} onChange={e => setDescription(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Version
                    </Form.Label>

                    <Col sm="4">
                        <Form.Control value={version} placeholder="..." onChange={e => setVersion(e.target.value)} />
                    </Col>

                    <Form.Label column sm="2">
                        Status
                    </Form.Label>

                    <Col sm="4">
                        <Form.Select onChange={e => setStatus(e.target.value)} value={status} style={{ color: findStatusColor(status, PROJECT_STATUS) }}>
                            {PROJECT_STATUS.map(status => {
                                return <option style={{ color: status.colorCode }} value={status.id} key={status.id}>{status.status}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form>

            <footer style={{ textAlign: "right" }}>
                <Button style={{ margin: "5px" }} variant="success" onClick={onSave}>
                    Save
                </Button>

                <Button style={{ margin: "5px" }} variant="danger" onClick={onCancel}>
                    Cancel
                </Button>
            </footer>
        </Container>
    );
};

export async function getServerSideProps(context: NextApiRequest) {
    const query = context.query;

    const PROJECT_STATUS: ProjectStatus[] = await getProjectStatus();
    const PROJECT: Project = await getProjectById(query.id);

    return {
        props: { PROJECT, PROJECT_STATUS },
    }
}

export default Edit;
