import axiosInstance from "@/utils/axios";
import type {Hotel, HotelInfo} from "../hotel";
import type {HotelParamsProps} from "@/features/hotels/api/useHotels.ts";

const getHotels = async (params?: HotelParamsProps): Promise<Hotel[]> => {
    try {
        const res = await axiosInstance.get(`/hotels`, {params});

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const getHotelById = async (hotelId: number): Promise<HotelInfo> => {
    try {
        const res = await axiosInstance.get(`/hotels/${hotelId}`);

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

export const HotelsService = {
    getHotels,
    getHotelById,
}
