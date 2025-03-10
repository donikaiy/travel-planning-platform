import express, {Request, Response} from "express";
import {getRatingByHotelId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const rating = await getRatingByHotelId(Number(req.query.hotelId))
        res.json(rating)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
