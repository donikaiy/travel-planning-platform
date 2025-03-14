import continentRepository from '../continents/repository';
import {getCountriesByContinentIdsMap} from "../countries/service";

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
