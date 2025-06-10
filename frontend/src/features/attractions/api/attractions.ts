import axiosInstance from "@/utils/axios";
import type { Attraction, AttractionCreate } from "../attraction";
import type {AttractionParamsProps} from "@/features/attractions/api/useAttractions.ts";

const getAllAttractions = async (params?: AttractionParamsProps): Promise<Attraction[]> => {
    try {
        const res = await axiosInstance.get('/attractions', {params});

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const getAttractionById = async (attractionId: number): Promise<Attraction> => {
    try {
        const res = await axiosInstance.get(`/attractions/${attractionId}`);

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const createAttraction = async (cityId: number, name: string, location: string, imageUrl: string, description: string, openingHours: string,
                                bestTimeToVisit: string, ticketsWebsite: string, additionalInformation: string): Promise<AttractionCreate> => {
    try {
        const res = await axiosInstance.post(`/attractions`, {
            cityId,
            name,
            location,
            imageUrl,
            description,
            openingHours,
            bestTimeToVisit,
            ticketsWebsite,
            additionalInformation
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const updateAttractionById = async (attractionId: number, cityId: number, name: string, location: string, imageUrl: string, description: string, openingHours: string,
                                    bestTimeToVisit: string, ticketsWebsite: string, additionalInformation: string): Promise<Attraction> => {
    try {
        const res = await axiosInstance.put(`/attractions`, {
            attractionId,
            cityId,
            name,
            location,
            imageUrl,
            description,
            openingHours,
            bestTimeToVisit,
            ticketsWebsite,
            additionalInformation
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const deleteAttractionById = async (attractionId: number) => {
    try {
        const res = await axiosInstance.delete(`/attractions`, {
            data: {
                attractionId
            }
        });

        return res.data;
    } catch (err: any) {
        return err.message;
    }
}

export const AttractionService = {
    getAllAttractions,
    getAttractionById,
    createAttraction,
    updateAttractionById,
    deleteAttractionById
}
