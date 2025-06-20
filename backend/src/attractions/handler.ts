import express from "express";
import type {Request, Response} from "express";
import {
    createAttraction,
    deleteAttractionById,
    getAllAttractions,
    getAttractionById, updateAttractionById
} from "./service.ts";
import {ALREADY_EXISTS} from "../utils/responseMessages.ts";

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

router.post('/', async (req: Request, res: Response) => {
    try {
        const newAttraction = await createAttraction(req.body.cityId, req.body.name, req.body.location, req.body.imageUrl, req.body.description, req.body.openingHours, req.body.bestTimeToVisit, req.body.ticketsWebsite, req.body.additionalInformation)
        res.status(201).json(newAttraction)
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
        await deleteAttractionById(Number(req.body.attractionId))
        res.status(200)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        await updateAttractionById(req.body.attractionId, req.body.cityId, req.body.name, req.body.location, req.body.imageUrl, req.body.description, req.body.openingHours, req.body.bestTimeToVisit, req.body.ticketsWebsite, req.body.additionalInformation)
        res.status(200)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
