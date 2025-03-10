import countryCityRepository from '../countryCities/repository';
import {getCitiesByIds} from "../cities/service";

export const getAllCitiesByCountryId = async (countryId: number) => {
    const countryCities = await countryCityRepository.getAllCitiesByCountryId(countryId)

    const cityIds: number[] = countryCities.map(countryCity => countryCity.cityId)

    return getCitiesByIds(cityIds)
}
