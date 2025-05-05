import {Cuisine, CuisineDB} from "./domain";
import {connection} from "../repository";

const getAllCuisinesByCountryId = async (countryId: number): Promise<Cuisine[]> => {
    const [results] = await connection.execute<CuisineDB[]>(`SELECT * FROM cuisine WHERE country_id = ?`, [countryId]);

    if (results.length == 0) {
        return [];
    }

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
