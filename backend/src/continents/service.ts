import continentRepository from '../continents/repository.ts';
import {getCountriesByContinentIdsMap} from "../countries/service.ts";

export const getAllContinents = async () => {
    const continents = await continentRepository.getAllContinents()

    const continentIds = continents.map(continent => continent.continentId)

    const countriesMap = await getCountriesByContinentIdsMap(continentIds);

    return continents.map((continent) => {
        return {
            ...continent,
            countries: countriesMap.get(continent.continentId) || []
        }
    })
}
