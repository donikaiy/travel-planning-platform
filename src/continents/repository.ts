import {Continent, ContinentDb} from "./domain";
import {connection} from "../repository";

const getAllContinents = async (): Promise<Continent[]> => {
    const [results] = await connection.query<ContinentDb[]>(`SELECT * FROM continents`);

    return results.map(continentDb => {
        const continent: Continent = {
            continentId: continentDb.continent_id,
            name: continentDb.name,
            imageUrl: continentDb.image_url,
        }

        return continent
    })
}

export default {getAllContinents}
