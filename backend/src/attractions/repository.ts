import type {Attraction, AttractionDb} from "./domain.d.ts";
import {connection} from "../repository.ts";
import {placeholderIds} from "../utils/database.ts";

export type Filters = {
    cityId?: number,
}

const getAllAttractions = async (filters: Filters = {}): Promise<Attraction[]> => {
    let query = 'SELECT * FROM attractions WHERE 1=1'
    const params: any[] = []

    if (filters.cityId !== undefined) {
        query += ' AND city_id = ?'
        params.push(filters.cityId)
    }

    const [results] = await connection.query<AttractionDb[]>(query, params)

    return results.map((attractionDb: AttractionDb) => {
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

    const attractionDb = result[0] as AttractionDb;

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

    return results.map((attractionDb: AttractionDb) => {
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

    results.forEach((attractionDb: AttractionDb) => {
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
    getAttractionsByCityIdsMap
}
