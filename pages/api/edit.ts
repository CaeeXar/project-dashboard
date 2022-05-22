import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteProject, updateProject } from '../../js/database';
import type { Project } from '../../js/types';
import fs from 'fs';

const prepareDescription = (desc: string) => {
    let newDesc = ``;
    desc.split('').forEach((char) => {
        if (char === `'`) newDesc += `''`;
        else newDesc += char;
    });
    return newDesc;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const project: Project = req.body;

    if (req.method === 'POST') {
        // validating
        project.description = prepareDescription(project.description);

        return updateProject(project)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    }

    if (req.method === 'DELETE') {
        if (!!project.logo) {
            try {
                fs.unlinkSync(`./uploads/${project.logo}`);
            } catch {
                console.error('Failed to delete logo!');
            }
        }

        return deleteProject(project.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    }
};

export default handler;
