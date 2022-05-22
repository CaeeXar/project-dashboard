import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import mime from 'mime';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(400).send('Only GET!');

    if (!req.query || !req.query.name) return res.status(400).send('Wrong query!');

    const img = await fs.readFile(`./uploads/${req.query.name}`);
    const type = mime.getType('' + req.query.name);

    res.setHeader('Content-Type', '' + type);
    return res.status(200).send(img);
};

export default handler;
