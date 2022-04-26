import type { NextApiRequest, NextApiResponse } from 'next'
import { insertProject } from '../../js/database';
import type { Project } from '../../js/types';

const prepareDescription = (desc: string) => {
    let newDesc = ``;
    desc.split("").forEach(char => {
        if (char === `'`) newDesc += `''`;
        else newDesc += char;
    });
    return newDesc;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST allowed" });
        return;
    }

    const project: Project = req.body;

    // validating
    project.description = prepareDescription(project.description);

    return insertProject(project)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));

}