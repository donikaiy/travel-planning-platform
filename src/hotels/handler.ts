import express, {Request, Response} from "express";
import {getAllHotels, getHotelById} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const filters = {
            destinationCityId: req.query.destinationCityId ? Number(req.query.destinationCityId) : undefined,
        }

        const hotels = await getAllHotels(filters);
        res.json(hotels)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:hotelId', async (req: Request, res: Response) => {
    try {
        const hotel = await getHotelById(Number(req.params.hotelId));
        res.json(hotel)
    } catch(err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
