import express from "express";
import type {Request, Response} from "express";
import {getRoundTrip} from "./service.ts";

const router = express.Router();

router.get('/round-trip', async (req: Request, res: Response) => {
    try {
        const roundTrip = await getRoundTrip({
            departureCityId: req.query.departureCityId ? Number(req.query.departureCityId) : undefined,
            destinationCityId: req.query.destinationCityId ? Number(req.query.destinationCityId) : undefined,
            departAt: req.query.departAt ? String(req.query.departAt) : undefined,
            returnAt: req.query.returnAt ? String(req.query.returnAt) : undefined
        });

        res.json(roundTrip)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
