import express, {Request, Response} from "express";
import {getAllRestaurants} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const restaurants = await getAllRestaurants({
            cityId: req.query.cityId ? Number(req.query.cityId) : undefined
        });

        res.json(restaurants)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
