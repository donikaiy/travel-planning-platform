import express, {Request, Response} from "express";
import {getAllReadyTours, getReadyTourById} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const readyTours = await getAllReadyTours();
        res.json(readyTours)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:readyTourId', async (req: Request, res: Response) => {
    try {
        const readyTour = await getReadyTourById(Number(req.params.readyTourId));
        res.json(readyTour)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
