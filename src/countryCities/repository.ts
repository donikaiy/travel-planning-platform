import {CountryCity, CountryCityDB} from "./domain";
import {connection} from "../repository";

const getAllCitiesByCountryId = async (countryId: number): Promise<CountryCity[]> => {
    const [results] = await connection.execute<CountryCityDB[]>(`SELECT * FROM country_cities WHERE country_id = ?`, [countryId]);
    return results.map(countryCityDB => {
        const countryCity: CountryCity = {
            cityId: countryCityDB.city_id,
            countryId: countryCityDB.country_id,
        }

        return countryCity
    })
}

export default {getAllCitiesByCountryId}
