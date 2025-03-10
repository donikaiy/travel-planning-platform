import continentRepository from '../continents/repository';
import {getCountriesByContinentId} from "../countries/service";

export const getAllContinents = async () => {
    const continents = await continentRepository.getAllContinents()

    return await Promise.all(continents.map(async (continent) => {
        const countries = await getCountriesByContinentId(continent.continentId)

        return {
            ...continent,
            countries: countries,
        }
    }))
}
