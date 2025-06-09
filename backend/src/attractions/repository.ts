import type {Attraction, AttractionDb} from "./domain.d.ts";
import {connection} from "../repository.ts";
import {placeholderIds} from "../utils/database.ts";
import type {QueryResult, ResultSetHeader} from "mysql2";
import type { Exist } from "../types/exist.d.ts";

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

const checkAttractionExists = async (name: string): Promise<boolean> => {
    const [result] = await connection.execute<Exist[]>('SELECT EXISTS(SELECT * FROM attractions WHERE name = ?) AS exist', [name])

    return result[0]?.exist === 1
}

const createAttraction = async (cityId: number, name: string, location: string, imageUrl: string, description: string, openingHours: string,
                                bestTimeToVisit: string, ticketsWebsite: string, additionalInformation: string): Promise<Attraction> => {
    const [result] = await connection.execute<ResultSetHeader>('INSERT INTO attractions (city_id, name, location, image_url, description, opening_hours, best_time_to_visit, tickets_website, additional_information) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [cityId, name, location, imageUrl, description, openingHours, bestTimeToVisit, ticketsWebsite, additionalInformation])

    return {
        attractionId: result.insertId,
        cityId,
        name,
        location,
        imageUrl,
        description,
        openingHours,
        bestTimeToVisit,
        ticketsWebsite,
        additionalInformation,
    }
}

const deleteAttractionById = async (attractionId: number): Promise<QueryResult> => {
    const [result] = await connection.execute('DELETE FROM attractions WHERE attraction_id = ?', [attractionId])

    return result
}

const updateAttractionById = async (attractionId: number, cityId: number, name: string, location: string, imageUrl: string, description: string, openingHours: string,
                                    bestTimeToVisit: string, ticketsWebsite: string, additionalInformation: string): Promise<QueryResult> => {
    const [result] = await connection.execute('UPDATE attractions SET city_id = ?, name = ?, location = ?, image_url = ?, description = ?, opening_hours = ?, best_time_to_visit = ?, tickets_website = ?, additional_information = ? WHERE attraction_id = ?', [cityId, name, location, imageUrl, description, openingHours, bestTimeToVisit, ticketsWebsite, additionalInformation, attractionId])

    return result
}

export default {
    getAllAttractions,
    getAttractionById,
    getAttractionsByIds,
    getAttractionsByCityIdsMap,
    checkAttractionExists,
    createAttraction,
    deleteAttractionById,
    updateAttractionById
}
