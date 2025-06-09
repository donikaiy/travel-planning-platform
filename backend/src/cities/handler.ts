import express from "express";
import type {Request, Response} from "express";
import {checkCityExists, createCity, deleteCityById, getAllCities, getCityById, updateCityById} from "./service.ts";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const cities = await getAllCities({includeAttractions: req.query.include_attractions === 'true'});
        res.json(cities)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:cityId', async (req: Request, res: Response)=> {
    try {
        const city = await getCityById(Number(req.params.cityId));
        res.json(city)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const check = await checkCityExists(req.body.name);
        if (check[0].cityExists) {
            res.status(409).json({error: "City already exists."})
            return
        }

        const newCity = await createCity(req.body.countryId, req.body.name, req.body.imageUrl)
        res.status(201).json(newCity)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.delete('/', async (req: Request, res: Response) => {
    try {
        await deleteCityById(Number(req.body.cityId))
        res.status(201).json({message: "City deleted."})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        await updateCityById(req.body.cityId, req.body.countryId, req.body.name, req.body.imageUrl)
        res.status(201).json({message: "City updated."})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
