import cityRepository from "../cities/repository";

export const getAllCities = async () => {
    return cityRepository.getAllCities()
}

export const getCityById = async (cityId: number) => {
    return cityRepository.getCityById(cityId)
}

export const checkCityExists = async (name: string) => {
    return cityRepository.checkCityExists(name)
}

export const createCity = async (countryId: number, name: string) => {
    return cityRepository.createCity(countryId, name)
}

export const getCitiesByIds = async (ids: number[]) => {
    return cityRepository.getCitiesByIds(ids)
}
