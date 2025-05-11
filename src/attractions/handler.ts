import express, {Request, Response} from "express";
import {getAllAttractions, getAttractionById} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const attractions = await getAllAttractions({
            cityId: req.query.cityId ? Number(req.query.cityId) : undefined
        });

        res.json(attractions)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:attractionId', async (req: Request, res: Response) => {
    try {
        const attraction = await getAttractionById(Number(req.params.attractionId))
        res.json(attraction)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
