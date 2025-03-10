import express, {Request, Response} from "express";
import {getAllCuisinesByCountryId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const cuisines = await getAllCuisinesByCountryId(Number(req.query.countryId))
        res.json(cuisines)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
