import express from "express";
import type {Request, Response} from "express";
import {
    checkRestaurantExists,
    createRestaurant,
    deleteRestaurantById,
    getAllRestaurants, updateRestaurantById
} from "./service.ts";

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

router.post('/', async (req: Request, res: Response) => {
    try {
        const check = await checkRestaurantExists(req.body.name, req.body.cityId);

        if (check[0].restaurantExists) {
            res.status(409).json({error: "Restaurant already exists."})
            return
        }

        const newRestaurant = await createRestaurant(req.body.cityId, req.body.name, req.body.location, req.body.imageUrl, req.body.priceSymbols)
        res.status(201).json(newRestaurant)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.delete('/', async (req: Request, res: Response) => {
    try {
        await deleteRestaurantById(Number(req.body.restaurantId))
        res.status(201).json({message: "Restaurant deleted."})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        await updateRestaurantById(req.body.restaurantId, req.body.cityId, req.body.name, req.body.location, req.body.imageUrl, req.body.priceSymbols)
        res.status(201).json({message: "Restaurant updated."})
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
