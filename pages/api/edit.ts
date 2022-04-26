import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteProject, updateProject } from '../../js/database';
import type { Project, ProjectStatus } from '../../js/types';

const prepareDescription = (desc: string) => {
    let newDesc = ``;
    desc.split("").forEach(char => {
        if (char === `'`) newDesc += `''`;
        else newDesc += char;
    });
    return newDesc;
}

export default (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {
        const project: Project = req.body;

        // validating
        project.description = prepareDescription(project.description);

        return updateProject(project)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    }

    if (req.method === "DELETE") {
        const pid = req.body;

        return deleteProject(pid)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    }
}