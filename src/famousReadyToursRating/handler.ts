import express, {Request, Response} from "express";
import {getAllRatingsByReadyTourIdsMap} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const rating = await getAllRatingsByReadyTourIdsMap(Number(req.query.restaurantId))
        res.json(rating)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
