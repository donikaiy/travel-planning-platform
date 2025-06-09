import type {City, CityDb} from "./domain.d.ts";
import {connection} from "../repository.ts";
import type {QueryResult, ResultSetHeader} from "mysql2";
import {placeholderIds} from "../utils/database.ts";

const getAllCities = async (): Promise<City[]> => {
    const [results] = await connection.query<CityDb[]>('SELECT * FROM cities');

    return results.map((cityDb: CityDb) => {
        const city: City = {
            cityId: cityDb.city_id,
            countryId: cityDb.country_id,
            name: cityDb.name,
            imageUrl: cityDb.image_url,
        }

        return city
    })
}

const getCityById = async (cityId: number): Promise<City> => {
    const [result] = await connection.execute<CityDb[]>('SELECT * FROM cities WHERE city_id = ?', [cityId])

    if (result.length == 0) {
        throw new Error(`City with id ${cityId} not found.`)
    }

    const cityDb = result[0] as CityDb;

    return {
        cityId: cityDb.city_id,
        countryId: cityDb.country_id,
        name: cityDb.name,
        imageUrl: cityDb.image_url,
    }
}

const checkCityExists = async (name: string): Promise<any> => {
    const [result] = await connection.execute('SELECT EXISTS(SELECT * FROM cities WHERE name = ?) AS cityExists', [name])

    return result
}

const createCity = async (countryId: number, name: string, imageUrl: string): Promise<City> => {
    const [result] = await connection.execute<ResultSetHeader>('INSERT INTO cities (country_id, name, image_url) VALUES (?, ?, ?)', [countryId, name, imageUrl])

    return {
        cityId: result.insertId,
        countryId,
        name,
        imageUrl
    };
}

const getCitiesByIds = async(ids: number[]): Promise<City[]> => {
    const [results] = await connection.execute<CityDb[]>(`SELECT * FROM cities WHERE cities.city_id IN (${placeholderIds(ids)})`, ids)

    return results.map((cityDb: CityDb) => {
        const city: City = {
            cityId: cityDb.city_id,
            countryId: cityDb.country_id,
            name: cityDb.name,
            imageUrl: cityDb.image_url,
        }

        return city
    })
}

const getAllCitiesByCountryId = async (countryId: number): Promise<City[]> => {
    const [results] = await connection.execute<CityDb[]>(`SELECT * FROM cities WHERE country_id = ?`, [countryId]);

    return results.map((cityDb: CityDb) => {
        const city: City = {
            cityId: cityDb.city_id,
            countryId: cityDb.country_id,
            name: cityDb.name,
            imageUrl: cityDb.image_url,
        }

        return city
    })
}

const getCitiesByCountryIdsMap = async (ids: number[]): Promise<Map<number, City[]>> => {
    const [results] = await connection.execute<CityDb[]>(`SELECT *
                                                          FROM cities
                                                          WHERE country_id IN (${placeholderIds(ids)})`, ids)

    const countryMap = new Map<number, City[]>();

    results.forEach((cityDb: CityDb) => {
        const city: City = {
            cityId: cityDb.city_id,
            countryId: cityDb.country_id,
            name: cityDb.name,
            imageUrl: cityDb.image_url,
        }

        if(countryMap.has((city.countryId))) {
            countryMap.get(city.countryId)!.push(city)
        } else {
            countryMap.set(city.countryId, [city])
        }
    })

    return countryMap
}

const deleteCityById = async (cityId: number): Promise<QueryResult> => {
    const [result] = await connection.execute('DELETE FROM cities WHERE city_id = ?', [cityId])

    return result
}

const updateCityById = async (cityId: number, countryId: number, name: string, imageUrl: string): Promise<QueryResult> => {
    const [result] = await connection.execute('UPDATE cities SET country_id = ?, name = ?, image_url = ? WHERE city_id = ?', [countryId, name, imageUrl, cityId]);

    return result
}

export default {getAllCities, getCityById, checkCityExists, createCity, getCitiesByIds, getCitiesByCountryIdsMap, getAllCitiesByCountryId, deleteCityById, updateCityById}
