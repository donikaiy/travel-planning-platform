import {Attraction, AttractionDb} from "./domain";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

const getAllAttractions = async (): Promise<Attraction[]> => {
    const [results] = await connection.query<AttractionDb[]>('SELECT * FROM attractions')

    return results.map(attractionDb => {
        const attraction: Attraction = {
            attractionId: attractionDb.attraction_id,
            cityId: attractionDb.city_id,
            name: attractionDb.name,
            location: attractionDb.location,
            imageUrl: attractionDb.image_url,
            description: attractionDb.description,
            openingHours: attractionDb.opening_hours,
            bestTimeToVisit: attractionDb.best_time_to_visit,
            ticketsWebsite: attractionDb.tickets_website,
            additionalInformation: attractionDb.additional_information,
        }

        return attraction
    })
}

const getAttractionById = async (attractionId: number): Promise<Attraction> => {
    const [result] = await connection.execute<AttractionDb[]>('SELECT * FROM attractions WHERE attraction_id = ?', [attractionId])

    if (result.length === 0) {
        throw new Error(`Attraction with id ${attractionId} not found`)
    }

    const attractionDb = result[0]

    return {
        attractionId: attractionDb.attraction_id,
        cityId: attractionDb.city_id,
        name: attractionDb.name,
        location: attractionDb.location,
        imageUrl: attractionDb.image_url,
        description: attractionDb.description,
        openingHours: attractionDb.opening_hours,
        bestTimeToVisit: attractionDb.best_time_to_visit,
        ticketsWebsite: attractionDb.tickets_website,
        additionalInformation: attractionDb.additional_information,
    }
}

const getAttractionsByIds = async (ids: number[]): Promise<Attraction[]> => {
    const [results] = await connection.execute<AttractionDb[]>(`SELECT *
                                                               FROM attractions
                                                               WHERE attraction_id IN (${placeholderIds(ids)})`, ids)

    return results.map(attractionDb => {
        const attraction: Attraction = {
            attractionId: attractionDb.attraction_id,
            cityId: attractionDb.city_id,
            name: attractionDb.name,
            location: attractionDb.location,
            imageUrl: attractionDb.image_url,
            description: attractionDb.description,
            openingHours: attractionDb.opening_hours,
            bestTimeToVisit: attractionDb.best_time_to_visit,
            ticketsWebsite: attractionDb.tickets_website,
            additionalInformation: attractionDb.additional_information,
        }

        return attraction
    })
}

const getAttractionsByCityId = async (cityId: number): Promise<Attraction[]> => {
    const [results] = await connection.execute<AttractionDb[]>(`SELECT * FROM attractions WHERE city_id = ?`, [cityId])

    return results.map(attractionDb => {
        const attraction: Attraction = {
            attractionId: attractionDb.attraction_id,
            cityId: attractionDb.city_id,
            name: attractionDb.name,
            location: attractionDb.location,
            imageUrl: attractionDb.image_url,
            description: attractionDb.description,
            openingHours: attractionDb.opening_hours,
            bestTimeToVisit: attractionDb.best_time_to_visit,
            ticketsWebsite: attractionDb.tickets_website,
            additionalInformation: attractionDb.additional_information,
        }

        return attraction
    })
}

export default {getAllAttractions, getAttractionById, getAttractionsByIds, getAttractionsByCityId}
