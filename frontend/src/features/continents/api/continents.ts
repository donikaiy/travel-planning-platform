import type { Continent } from "../continent";
import axiosInstance from "@/utils/axios.ts";


const getAllContinents = async (): Promise<Continent[]> => {
    try {
        const res = await axiosInstance.get("/continents");

        return res.data
    } catch (err: any) {
        return err.message
    }
}

export const ContinentService = {
    getAllContinents,
}
