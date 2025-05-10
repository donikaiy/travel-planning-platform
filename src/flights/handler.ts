import express, {Request, Response} from "express";
import {getDepartureAndReturnFlights} from "./service";

const router = express.Router();

router.get('/round-trip', async (req: Request, res: Response) => {
    try {
        const filters = {
            departureCityId: req.query.departureCityId ? Number(req.query.departureCityId) : undefined,
            destinationCityId: req.query.destinationCityId ? Number(req.query.destinationCityId) : undefined,
            departAt: req.query.departAt ? String(req.query.departAt) : undefined,
            returnAt: req.query.returnAt ? String(req.query.returnAt) : undefined
        }

        const flights = await getDepartureAndReturnFlights({departureCityId: filters.departureCityId, destinationCityId: filters.destinationCityId, departAt: filters.departAt, returnAt: filters.returnAt});
        res.json(flights)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
