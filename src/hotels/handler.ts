import express, {Request, Response} from "express";
import {getAllHotels, getHotelByIdService} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const hotels = await getAllHotels();
        res.json(hotels)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:hotelId', async (req: Request, res: Response) => {
    try {
        const hotel = await getHotelByIdService(Number(req.params.hotelId));
        res.json(hotel)
    } catch(err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
