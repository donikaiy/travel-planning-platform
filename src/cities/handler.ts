import express, {Request, Response} from "express";
import {checkCityExists, createCity, getAllCities, getCityById} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const cities = await getAllCities();
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
        res.status(201).json({message: "City created successfully!", country: newCity})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
