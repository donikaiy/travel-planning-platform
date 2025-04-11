import {City, CityDB} from "./domain";
import {connection} from "../repository";
import {ResultSetHeader} from "mysql2";
import {placeholderIds} from "../utils/database";

const getAllCities = async (): Promise<City[]> => {
    const [results] = await connection.query<CityDB[]>('SELECT * FROM cities');
    return results.map(cityDB => {
        const city: City = {
            cityId: cityDB.city_id,
            countryId: cityDB.country_id,
            name: cityDB.name,
            imageUrl: cityDB.image_url,
        }

        return city
    })
}

const getCityById = async (cityId: number): Promise<City[]> => {
    const [result] = await connection.execute<CityDB[]>('SELECT * FROM cities WHERE city_id = ?', [cityId])
    return result.map(cityDB => {
        const city: City = {
            cityId: cityDB.city_id,
            countryId: cityDB.country_id,
            name: cityDB.name,
            imageUrl: cityDB.image_url,
        }

        return city
    })
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
    const [results] = await connection.execute<CityDB[]>(`SELECT * FROM cities WHERE cities.city_id IN (${placeholderIds(ids)})`, ids)
    return results.map(cityDB => {
        const city: City = {
            cityId: cityDB.city_id,
            countryId: cityDB.country_id,
            name: cityDB.name,
            imageUrl: cityDB.image_url,
        }

        return city
    })
}

const getAllCitiesByCountryId = async (countryId: number): Promise<City[]> => {
    const [results] = await connection.execute<CityDB[]>(`SELECT * FROM cities WHERE country_id = ?`, [countryId]);
    return results.map(cityDB => {
        const city: City = {
            cityId: cityDB.city_id,
            countryId: cityDB.country_id,
            name: cityDB.name,
            imageUrl: cityDB.image_url,
        }

        return city
    })
}

const getCitiesByCountryIdsMap = async (ids: number[]): Promise<Map<number, City[]>> => {
    const [results] = await connection.execute<CityDB[]>(`SELECT *
                                                          FROM cities
                                                          WHERE country_id IN (${placeholderIds(ids)})`, ids)

    const countryMap = new Map<number, City[]>();

    results.forEach(cityDB => {
        const city: City = {
            cityId: cityDB.city_id,
            countryId: cityDB.country_id,
            name: cityDB.name,
            imageUrl: cityDB.image_url,
        }

        if(countryMap.has((city.countryId))) {
            countryMap.get(city.countryId)!.push(city)
        } else {
            countryMap.set(city.countryId, [city])
        }
    })

    return countryMap
}

export default {getAllCities, getCityById, checkCityExists, createCity, getCitiesByIds, getCitiesByCountryIdsMap, getAllCitiesByCountryId}
