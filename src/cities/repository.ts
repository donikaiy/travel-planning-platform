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
        }

        return city
    })
}

const checkCityExists = async (name: string): Promise<any> => {
    const [result] = await connection.execute('SELECT EXISTS(SELECT * FROM cities WHERE name = ?) AS cityExists', [name])

    return result
}

const createCity = async (countryId: number, name: string): Promise<City> => {
    const [result] = await connection.execute<ResultSetHeader>('INSERT INTO cities (country_id, name) VALUES (?, ?)', [countryId, name])

    return {
        cityId: result.insertId,
        countryId,
        name,
    };
}

const getCitiesByIds = async(ids: number[]): Promise<City[]> => {
    const [results] = await connection.execute<CityDB[]>(`SELECT * FROM cities WHERE cities.city_id IN (${placeholderIds(ids)})`, ids)
    return results.map(cityDB => {
        const city: City = {
            cityId: cityDB.city_id,
            countryId: cityDB.country_id,
            name: cityDB.name,
        }

        return city
    })
}

export default {getAllCities, getCityById, checkCityExists, createCity, getCitiesByIds}
