import express, {Request, Response} from "express";
import {checkCountryExists, createCountry, getAllCountries, getCountryById} from "./service";

export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const countries = await getAllCountries({includeCities: req.query.include_cities === 'true'});
        res.json(countries)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:countryId', async (req: Request, res: Response) => {
    try {
        const country = await getCountryById(Number(req.params.countryId));
        res.json(country)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const check = await checkCountryExists(req.body.name);
        if (check[0].countryExists) {
            res.status(409).json({error: "Country already exists."})
            return
        }

        const newCountry = await createCountry(req.body.continentId, req.body.name, req.body.galleryId, req.body.history)
        res.status(201).json({message: "Country created successfully!", country: newCountry})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
