import {Cuisine, CuisineDB} from "./domain";
import {connection} from "../repository";
import {placeholderSingle} from "../utils/database";

const getAllCuisinesByCountryId = async (countryId: number): Promise<Cuisine[]> => {
    const [results] = await connection.execute<CuisineDB[]>(`SELECT * FROM cuisine WHERE country_id = (${placeholderSingle})`, [countryId]);
    return results.map(cuisineDB => {
        const cuisine: Cuisine = {
            cuisineId: cuisineDB.cuisine_id,
            countryId: cuisineDB.country_id,
            text: cuisineDB.text,
        }

        return cuisine
    })
}

export default {getAllCuisinesByCountryId}
