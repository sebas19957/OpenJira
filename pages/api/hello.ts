import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    ok: boolean;
    message: string;
    method: string;
}

export default function handle (req: NextApiRequest, res: NextApiResponse<Data>) {

    console.log(process.env);
    

    res.status(200).json({
        ok: true,
        message: 'Todo correcto',
        method: req.method || 'no hay metodo'
    });
}