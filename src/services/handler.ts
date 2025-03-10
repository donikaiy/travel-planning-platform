import express, {Request, Response} from "express";
import {getServicesByIds} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const ids = req.query.ids as unknown as number[];

        if (!Array.isArray(ids)) {
            res.status(400).json({error: "Invalid or missing ids parameter"});
        }

        const services = await getServicesByIds(ids);
        res.json(services)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
