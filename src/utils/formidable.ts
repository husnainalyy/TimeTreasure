import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const parseForm = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        req.body = fields;
        (req as any).files = files;
        next();
    });
};
