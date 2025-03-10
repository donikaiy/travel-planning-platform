import repository from "./repository";

export const getServicesByIds = async (ids: number[]) => {
    return await repository.getServicesByIds(ids)
}
