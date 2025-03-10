import express, {Request, Response} from "express";
import {getAllContinents} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const continents = await getAllContinents()
        res.json(continents)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

export default router
