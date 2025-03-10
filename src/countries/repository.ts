import {connection} from "../repository";
import {Country, CountryDB} from "./domain";
import {ResultSetHeader} from "mysql2";

const getAllCountries = async (): Promise<Country[]> => {
    const [results] = await connection.query<CountryDB[]>('SELECT * FROM countries')
    return results.map(countryDB => {
        const country: Country = {
            countryId: countryDB.country_id,
            continentId: countryDB.continent_id,
            galleryId: countryDB.gallery_id,
            name: countryDB.name,
            history: countryDB.history,
        }

        return country
    })
}

const getCountriesByContinentId = async (continentId: number): Promise<Country[]> => {
    const [results] = await connection.query<CountryDB[]>('SELECT * FROM countries WHERE continent_id = ?', [continentId])
    return results.map(countryDB => {
        const country: Country = {
            countryId: countryDB.country_id,
            continentId: countryDB.continent_id,
            galleryId: countryDB.gallery_id,
            name: countryDB.name,
            history: countryDB.history,
        }

        return country
    })
}

const getCountryById = async (countryId: number): Promise<Country[]> => {
    const [result] = await connection.query<CountryDB[]>('SELECT * FROM countries WHERE country_id = ?', [countryId])
    return result.map(countryDB => {
        const country: Country = {
            countryId: countryDB.country_id,
            continentId: countryDB.continent_id,
            galleryId: countryDB.gallery_id,
            name: countryDB.name,
            history: countryDB.history,
        }

        return country
    })
}

const checkCountryExists = async (name: string): Promise<any> => {
    const [result] = await connection.query('SELECT EXISTS(SELECT * FROM countries WHERE name = ?) AS countryExists', [name])

    return result
}

const createCountry = async (continentId: number, name: string, galleryId: number, history: string): Promise<Country> => {
    const [result] = await connection.query<ResultSetHeader>('INSERT INTO countries (continent_id, name, gallery_id, history) VALUES (?, ?, ?, ?)', [continentId, name, galleryId, history])

    return {
        countryId: result.insertId,
        continentId,
        galleryId,
        name,
        history,
    };
}

export default {getAllCountries, getCountriesByContinentId, getCountryById, checkCountryExists, createCountry}
