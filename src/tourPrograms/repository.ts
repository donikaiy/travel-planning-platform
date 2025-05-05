import {connection} from "../repository";
import {TourProgram, TourProgramDb} from "./domain";

const getAllTourProgramsByTourId = async (tourId: number): Promise<TourProgram[]> => {
    const [results] = await connection.execute<TourProgramDb[]>(`SELECT * FROM tour_program WHERE tour_id = ?`, [tourId]);

    return results.map(tourProgramDb => {
        const tourProgram: TourProgram = {
            tourProgramId: tourProgramDb.tour_program_id,
            tourId: tourProgramDb.tour_id,
            day: tourProgramDb.day,
            title: tourProgramDb.title,
            description: tourProgramDb.description,
        }

        return tourProgram
    })
}

export default {getAllTourProgramsByTourId}
