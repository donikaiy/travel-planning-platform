import {Attraction, AttractionDB} from "./domain";
import {connection} from "../repository";

const getAllAttractions = async (): Promise<Attraction[]> => {
    const [results] = await connection.query<AttractionDB[]>('SELECT * FROM attractions')
    return results.map(attractionDB => {
        const attraction: Attraction = {
            attractionId: attractionDB.attraction_id,
            cityId: attractionDB.city_id,
            galleryId: attractionDB.gallery_id,
            name: attractionDB.name,
            location: attractionDB.location,
            description: attractionDB.description,
            openingHours: attractionDB.opening_hours,
            bestTimeToVisit: attractionDB.best_time_to_visit,
            ticketsWebsite: attractionDB.tickets_website,
            additionalInformation: attractionDB.additional_information,
        }

        return attraction
    })
}

const getAttractionById = async (attractionId: number): Promise<Attraction[]> => {
    const [result] = await connection.query<AttractionDB[]>('SELECT * FROM attractions WHERE attraction_id = ?', [attractionId])
    return result.map(attractionDB => {
        const attraction: Attraction = {
            attractionId: attractionDB.attraction_id,
            cityId: attractionDB.city_id,
            galleryId: attractionDB.gallery_id,
            name: attractionDB.name,
            location: attractionDB.location,
            description: attractionDB.description,
            openingHours: attractionDB.opening_hours,
            bestTimeToVisit: attractionDB.best_time_to_visit,
            ticketsWebsite: attractionDB.tickets_website,
            additionalInformation: attractionDB.additional_information,
        }

        return attraction
    })
}

const getAttractionsByIds = async (ids: number[]): Promise<Attraction[]> => {
    const [result] = await connection.query<AttractionDB[]>(`SELECT * FROM attractions WHERE attraction_id IN (${ids.join(',')})`)
    return result.map(attractionDB => {
        const attraction: Attraction = {
            attractionId: attractionDB.attraction_id,
            cityId: attractionDB.city_id,
            galleryId: attractionDB.gallery_id,
            name: attractionDB.name,
            location: attractionDB.location,
            description: attractionDB.description,
            openingHours: attractionDB.opening_hours,
            bestTimeToVisit: attractionDB.best_time_to_visit,
            ticketsWebsite: attractionDB.tickets_website,
            additionalInformation: attractionDB.additional_information,
        }

        return attraction
    })
}

export default {getAllAttractions, getAttractionById, getAttractionsByIds}
