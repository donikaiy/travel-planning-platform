import {ReadyTour, ReadyTourDB} from "./domain";
import {connection} from "../repository";

const getAllReadyTours = async (): Promise<ReadyTour[]> => {
    const [results] = await connection.query<ReadyTourDB[]>('SELECT * FROM ready_tours')

    return results.map(readyTourDB => {
        const readyTour: ReadyTour = {
            readyTourId: readyTourDB.ready_tour_id,
            cityId: readyTourDB.city_id,
            imageUrl: readyTourDB.image_url,
            name: readyTourDB.name,
            daysNights: readyTourDB.days_nights,
            description: readyTourDB.description,
            highlights: readyTourDB.highlights,
        }

        return readyTour
    })
}

const getReadyTourById = async (readyTourId: number): Promise<ReadyTour> => {
    const [result] = await connection.execute<ReadyTourDB[]>('SELECT * FROM ready_tours WHERE ready_tour_id = ?', [readyTourId])

    if (result.length === 0) {
        throw new Error(`Tour with id ${readyTourId} not found`)
    }

    const readyTourDB = result[0]

    return {
        readyTourId: readyTourDB.ready_tour_id,
        cityId: readyTourDB.city_id,
        imageUrl: readyTourDB.image_url,
        name: readyTourDB.name,
        daysNights: readyTourDB.days_nights,
        description: readyTourDB.description,
        highlights: readyTourDB.highlights,
    }
}

export default {getAllReadyTours, getReadyTourById}
