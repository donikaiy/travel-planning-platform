import express, {Request, Response} from "express";
import {getAllCitiesByCountryId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const countryCities = await getAllCitiesByCountryId(Number(req.query.countryId))
        res.json(countryCities)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
