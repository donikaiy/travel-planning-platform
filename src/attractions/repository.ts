import {Attraction, AttractionDB} from "./domain";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

const getAllAttractions = async (): Promise<Attraction[]> => {
    const [results] = await connection.query<AttractionDB[]>('SELECT * FROM attractions')
    return results.map(attractionDB => {
        const attraction: Attraction = {
            attractionId: attractionDB.attraction_id,
            cityId: attractionDB.city_id,
            name: attractionDB.name,
            location: attractionDB.location,
            imageUrl: attractionDB.image_url,
            description: attractionDB.description,
            openingHours: attractionDB.opening_hours,
            bestTimeToVisit: attractionDB.best_time_to_visit,
            ticketsWebsite: attractionDB.tickets_website,
            additionalInformation: attractionDB.additional_information,
        }

        return attraction
    })
}

const getAttractionById = async (attractionId: number): Promise<Attraction> => {
    const [result] = await connection.execute<AttractionDB[]>('SELECT * FROM attractions WHERE attraction_id = ?', [attractionId])

    if (result.length === 0) {
        throw new Error('Attraction not found')
    }

    const attractionDB = result[0]

    return {
        attractionId: attractionDB.attraction_id,
        cityId: attractionDB.city_id,
        name: attractionDB.name,
        location: attractionDB.location,
        imageUrl: attractionDB.image_url,
        description: attractionDB.description,
        openingHours: attractionDB.opening_hours,
        bestTimeToVisit: attractionDB.best_time_to_visit,
        ticketsWebsite: attractionDB.tickets_website,
        additionalInformation: attractionDB.additional_information,
    }
}

const getAttractionsByIds = async (ids: number[]): Promise<Attraction[]> => {
    const [result] = await connection.execute<AttractionDB[]>(`SELECT *
                                                               FROM attractions
                                                               WHERE attraction_id IN (${placeholderIds(ids)})`, ids)
    return result.map(attractionDB => {
        const attraction: Attraction = {
            attractionId: attractionDB.attraction_id,
            cityId: attractionDB.city_id,
            name: attractionDB.name,
            location: attractionDB.location,
            imageUrl: attractionDB.image_url,
            description: attractionDB.description,
            openingHours: attractionDB.opening_hours,
            bestTimeToVisit: attractionDB.best_time_to_visit,
            ticketsWebsite: attractionDB.tickets_website,
            additionalInformation: attractionDB.additional_information,
        }

        return attraction
    })
}

const getAttractionsBiCityId = async (cityId: number): Promise<Attraction[]> => {
    const [results] = await connection.execute<AttractionDB[]>(`SELECT * FROM attractions WHERE city_id = ?`, [cityId])
    return results.map(attractionDB => {
        const attraction: Attraction = {
            attractionId: attractionDB.attraction_id,
            cityId: attractionDB.city_id,
            name: attractionDB.name,
            location: attractionDB.location,
            imageUrl: attractionDB.image_url,
            description: attractionDB.description,
            openingHours: attractionDB.opening_hours,
            bestTimeToVisit: attractionDB.best_time_to_visit,
            ticketsWebsite: attractionDB.tickets_website,
            additionalInformation: attractionDB.additional_information,
        }

        return attraction
    })
}

export default {getAllAttractions, getAttractionById, getAttractionsByIds, getAttractionsBiCityId}
