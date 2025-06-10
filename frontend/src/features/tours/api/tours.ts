import type {Tour, TourInfo} from "@/features/tours/tour";
import axiosInstance from "@/utils/axios.ts";

const getAllTours = async (): Promise<TourInfo[]> => {
    try {
        const res = await axiosInstance.get('/tours')

        return res.data;
    } catch (err: any) {
        return err.message
    }
}

const getTourById = async (tourId: number): Promise<Tour> => {
    try {
        const res = await axiosInstance.get(`/tours/${tourId}`)

        return res.data;
    } catch (err: any) {
        return err.message
    }
}

export const TourService = {
    getAllTours,
    getTourById,
}
