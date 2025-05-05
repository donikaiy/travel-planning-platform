import {Tour, TourDB} from "./domain";
import {connection} from "../repository";

const getAllTours = async (): Promise<Tour[]> => {
    const [results] = await connection.query<TourDB[]>('SELECT * FROM ready_tours')

    return results.map(tourDB => {
        const tour: Tour = {
            readyTourId: tourDB.ready_tour_id,
            cityId: tourDB.city_id,
            imageUrl: tourDB.image_url,
            name: tourDB.name,
            daysNights: tourDB.days_nights,
            description: tourDB.description,
            highlights: tourDB.highlights,
        }

        return tour
    })
}

const getTourById = async (tourId: number): Promise<Tour> => {
    const [result] = await connection.execute<TourDB[]>('SELECT * FROM ready_tours WHERE ready_tour_id = ?', [tourId])

    if (result.length === 0) {
        throw new Error(`Tour with id ${tourId} not found`)
    }

    const tourDB = result[0]

    return {
        readyTourId: tourDB.ready_tour_id,
        cityId: tourDB.city_id,
        imageUrl: tourDB.image_url,
        name: tourDB.name,
        daysNights: tourDB.days_nights,
        description: tourDB.description,
        highlights: tourDB.highlights,
    }
}

export default {getAllTours, getTourById}
