import express from "express";
import type {Request, Response} from "express";
import {getAllHotels, getHotelById} from "./service.ts";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const hotels = await getAllHotels({
            cityId: req.query.cityId ? Number(req.query.cityId) : undefined
        });

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
