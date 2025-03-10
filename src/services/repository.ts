import {connection} from "../repository";
import {Service, ServiceDB} from "./domain";

const getServicesByIds = async (ids: number[]): Promise<Service[]> => {
    const [results] = await connection.query<ServiceDB[]>(`SELECT * FROM services WHERE service_id IN (${ids.join(',')})`);
    return results.map(serviceDB => {
        const service: Service = {
            serviceId: serviceDB.service_id,
            text: serviceDB.text,
        }

        return service
    })
}

export default {getServicesByIds}
