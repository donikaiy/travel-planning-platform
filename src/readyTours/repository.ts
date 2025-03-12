import {ReadyTour, ReadyTourDB} from "./domain";
import {connection} from "../repository";
import {placeholderSingle} from "../utils/database";

const getAllReadyTours = async (): Promise<ReadyTour[]> => {
    const [results] = await connection.query<ReadyTourDB[]>('SELECT * FROM ready_tours')
    return results.map(readyTourDB => {
        const readyTour: ReadyTour = {
            readyTourId: readyTourDB.ready_tour_id,
            cityId: readyTourDB.city_id,
            galleryId: readyTourDB.gallery_id,
            name: readyTourDB.name,
            daysNights: readyTourDB.days_nights,
            description: readyTourDB.description,
            highlights: readyTourDB.highlights,
        }

        return readyTour
    })
}

const getReadyTourById = async (readyTourId: number): Promise<ReadyTour[]> => {
    const [result] = await connection.execute<ReadyTourDB[]>(`SELECT * FROM ready_tours WHERE ready_tour_id = (${placeholderSingle})`, [readyTourId])
    return result.map(readyTourDB => {
        const readyTour: ReadyTour = {
            readyTourId: readyTourDB.ready_tour_id,
            cityId: readyTourDB.city_id,
            galleryId: readyTourDB.gallery_id,
            name: readyTourDB.name,
            daysNights: readyTourDB.days_nights,
            description: readyTourDB.description,
            highlights: readyTourDB.highlights,
        }

        return readyTour
    })
}

export default {getAllReadyTours, getReadyTourById}
