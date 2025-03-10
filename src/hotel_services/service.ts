import hotelServiceRepository from "../hotel_services/repository";
import {getServicesByIds} from "../services/service";

export const getAllServicesByHotelId = async (hotelId: number) => {
    const hotelServices = await hotelServiceRepository.getAllServicesByHotelId(hotelId)

    const serviceIds: number[] = hotelServices.map(service => service.serviceId);

    return getServicesByIds(serviceIds)
}
