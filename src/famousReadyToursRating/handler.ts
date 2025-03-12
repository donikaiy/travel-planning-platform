import express, {Request, Response} from "express";
import {getReadyToursRatingByReadyTourId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const rating = await getReadyToursRatingByReadyTourId(Number(req.query.restaurantId))
        res.json(rating)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
