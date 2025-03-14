import {connection} from "../repository";
import {Service, ServiceDB} from "./domain";
import {placeholderIds} from "../utils/database";

const getServicesByIds = async (ids: number[]): Promise<Service[]> => {
    if (ids.length === 0) {
        console.error('No service IDs provided.');
        return [];
    }

    const [results] = await connection.execute<ServiceDB[]>(`SELECT * FROM services WHERE service_id IN (${placeholderIds(ids)})`, ids);
    return results.map(serviceDB => {
        const service: Service = {
            serviceId: serviceDB.service_id,
            text: serviceDB.text,
        }

        return service
    })
}

export default {getServicesByIds}
