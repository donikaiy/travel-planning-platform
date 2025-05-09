import express, {Request, Response} from "express";
import {getAllFlights} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const filters = {
            departureCityId: req.query.departureCityId || undefined,
            destinationCityId: req.query.destinationCityId || undefined,
            departureDate: req.query.departureDate || undefined,
            returnDate: req.query.returnDate || undefined,
        }

        const flights = await getAllFlights(filters);
        res.json(flights)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
