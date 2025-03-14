import repository from "./repository";

export const getServicesByIds = async (ids: number[]) => {
    return repository.getServicesByIds(ids)
}
