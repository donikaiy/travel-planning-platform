import {Continent, ContinentDB} from "./domain";
import {connection} from "../repository";

const getAllContinents = async (): Promise<Continent[]> => {
    const [results] = await connection.query<ContinentDB[]>(`SELECT * FROM continents`);
    return results.map(continentDB => {
        const continent: Continent = {
            continentId: continentDB.continent_id,
            name: continentDB.name,
            imageUrl: continentDB.image_url,
        }

        return continent
    })
}

export default {getAllContinents}
