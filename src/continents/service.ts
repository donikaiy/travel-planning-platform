import continentRepository from '../continents/repository';
import {getCountriesByContinentIds} from "../countries/service";

export const getAllContinents = async () => {
    const continents = await continentRepository.getAllContinents()

    const continentIds = continents.map(continent => continent.continentId)

    const countries = await getCountriesByContinentIds(continentIds);

    return continents.map((continent) => {
        const continentCountries = countries.filter(country => country.continentId === continent.continentId);

        return {
            ...continent,
            countries: continentCountries
        };
    })
}
