import express, {Request, Response} from "express";
import {getAllTours, getTourById} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const tours = await getAllTours();
        res.json(tours)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:tourId', async (req: Request, res: Response) => {
    try {
        const tour = await getTourById(Number(req.params.tourId));
        res.json(tour)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
