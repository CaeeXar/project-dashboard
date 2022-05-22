import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(400).send('Only POST!');

    const form = new formidable.IncomingForm();
    return form.parse(req, async function (err, fields, files) {
        let file: File | File[] = files.file;

        if (Array.isArray(file)) file = file[0];
        if (!file || !file.originalFilename)
            return res.status(400).json({ message: 'Error during upload!' });

        // const split = file.originalFilename.split('.');
        // const ext = split[split.length - 1];
        const timestamp = new Date().getTime();
        const data = fs.readFileSync(file.filepath);
        const newFilename = timestamp + '_' + file.originalFilename;

        fs.writeFileSync(`./uploads/${newFilename}`, data);
        await fs.unlinkSync(file.filepath);

        return res.status(200).json({ ...file, newFilename });
    });
};

export default handler;
