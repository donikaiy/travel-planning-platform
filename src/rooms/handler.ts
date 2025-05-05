import express, {Request, Response} from "express";
import {getAllRoomsByHotelId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const rooms = await getAllRoomsByHotelId(Number(req.query.hotelId))
        res.json(rooms)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
