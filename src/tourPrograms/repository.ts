import {connection} from "../repository";
import {TourProgram, TourProgramDB} from "./domain";

const getAllTourProgramsByTourId = async (tourId: number): Promise<TourProgram[]> => {
    const [results] = await connection.execute<TourProgramDB[]>(`SELECT * FROM tour_program WHERE tour_id = ?`, [tourId]);

    return results.map(tourProgramDB => {
        const tourProgram: TourProgram = {
            tourProgramId: tourProgramDB.tour_program_id,
            tourId: tourProgramDB.tour_id,
            day: tourProgramDB.day,
            title: tourProgramDB.title,
            description: tourProgramDB.description,
        }

        return tourProgram
    })
}

export default {getAllTourProgramsByTourId}
