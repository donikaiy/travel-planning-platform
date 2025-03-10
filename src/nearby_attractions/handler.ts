import express, {Request, Response} from "express";
import {getAllNearbyAttractionsByHotelId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const nearbyAttractions = await getAllNearbyAttractionsByHotelId(Number(req.query.hotelId))
        res.json(nearbyAttractions)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
