import express, {Request, Response} from "express";
import {getAllTourProgramsByReadyTourId} from "./service";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const tourPrograms = await getAllTourProgramsByReadyTourId(Number(req.query.readyTourId))
        res.json(tourPrograms)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})
