import express, {Request, Response} from "express";
import {getAllFlights} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const flights = await getAllFlights();
        res.json(flights)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
