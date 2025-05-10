import {Attraction, AttractionDb} from "./domain";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

export type Filters = {
    destinationCityId?: number,
}

const getAllAttractions = async (filters: Filters = {}): Promise<Attraction[]> => {
    let query = 'SELECT * FROM attractions'
    const params: any[] = []

    if (filters.destinationCityId !== undefined) {
        query += ' WHERE city_id = ?'
        params.push(filters.destinationCityId)
    }

    const [results] = await connection.query<AttractionDb[]>(query, params)

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
    const [results] = await connection.execute<AttractionDb[]>(`SELECT *
                                                                FROM attractions
                                                                WHERE city_id = ?`, [cityId])

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

const getAttractionsByCityIdsMap = async (ids: number[]): Promise<Map<number, Attraction[]>> => {
    const [results] = await connection.execute<AttractionDb[]>(`SELECT *
                                                                FROM attractions
                                                                WHERE city_id IN (${placeholderIds(ids)})`, ids)

    const attractionMap = new Map<number, Attraction[]>()

    results.forEach(attractionDb => {
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

        if (attractionMap.has(attraction.cityId)) {
            attractionMap.get(attraction.cityId)!.push(attraction)
        } else {
            attractionMap.set(attraction.cityId, [attraction])
        }
    })

    return attractionMap
}

export default {
    getAllAttractions,
    getAttractionById,
    getAttractionsByIds,
    getAttractionsByCityId,
    getAttractionsByCityIdsMap
}
