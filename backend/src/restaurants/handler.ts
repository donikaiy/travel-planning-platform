import express from "express";
import type {Request, Response} from "express";
import {
    createRestaurant,
    deleteRestaurantById,
    getAllRestaurants, updateRestaurantById
} from "./service.ts";
import {ALREADY_EXISTS} from "../utils/responseMessages.ts";

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
        const newRestaurant = await createRestaurant(req.body.cityId, req.body.name, req.body.location, req.body.imageUrl, req.body.priceSymbols)
        res.status(201).json(newRestaurant)
    } catch (err: any) {
        if (err.message === ALREADY_EXISTS) {
            res.status(409).json({error: err.message})
            return
        }

        res.status(500).json({error: err.message})
    }
})

router.delete('/', async (req: Request, res: Response) => {
    try {
        await deleteRestaurantById(Number(req.body.restaurantId))
        res.status(200)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        await updateRestaurantById(req.body.restaurantId, req.body.cityId, req.body.name, req.body.location, req.body.imageUrl, req.body.priceSymbols)
        res.status(200)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
