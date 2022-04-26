import type { NextPage, NextApiRequest } from 'next';
import { ChangeEvent, useState, } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import type { ProjectStatus } from '../js/types';
import { getProjectStatus } from "../js/database";
import { NextRouter, useRouter } from 'next/router';

function routeHome(router: NextRouter) {
    router.push({
        pathname: "/",
    });
}

function findStatusColor(id: string, status: ProjectStatus[]) {
    return (status.find(s => s.id == id) || {}).colorCode || 'black';
}

function findStatusText(id: string, status: ProjectStatus[]) {
    return (status.find(s => s.id == id) || {}).status || 'NOT FOUND';
}

const New: NextPage = (props: any) => {
    const PROJECT_STATUS: ProjectStatus[] = [...props.PROJECT_STATUS];
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [version, setVersion] = useState("");
    const [statusId, setStatusId] = useState("");
    const [status, setStatus] = useState("");

    const onStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setStatusId(event.target.value);
        setStatus(findStatusText(event.target.value, PROJECT_STATUS));
    };
    const onCancel = () => routeHome(router);
    const onSave = async () => {
        const project = { title, description, version, statusId };

        const res = await fetch('/api/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });

        if (res.status === 200) {
            routeHome(router);
        } else {
            console.error(await res.json());
        }
    };

    return (
        <Container>
            <div style={{ padding: "25px", marginBottom: "10px" }}>
                <h1>Add new Project:</h1>
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
                        <Form.Select onChange={onStatusChange} value={statusId} style={{ color: findStatusColor(statusId, PROJECT_STATUS) }}>
                            <option value={""} disabled hidden>Choose current status</option>
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
    const PROJECT_STATUS: ProjectStatus[] = await getProjectStatus();

    return {
        props: { PROJECT_STATUS },
    }
}

export default New;