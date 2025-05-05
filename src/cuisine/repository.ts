import {Cuisine, CuisineDb} from "./domain";
import {connection} from "../repository";

const getAllCuisinesByCountryId = async (countryId: number): Promise<Cuisine[]> => {
    const [results] = await connection.execute<CuisineDb[]>(`SELECT * FROM cuisine WHERE country_id = ?`, [countryId]);

    return results.map(cuisineDb => {
        const cuisine: Cuisine = {
            cuisineId: cuisineDb.cuisine_id,
            countryId: cuisineDb.country_id,
            text: cuisineDb.text,
        }

        return cuisine
    })
}

export default {getAllCuisinesByCountryId}
