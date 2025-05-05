import {connection} from "../repository";
import {TourProgram, TourProgramDB} from "./domain";

const getAllTourProgramsByReadyTourId = async (readyTourId: number): Promise<TourProgram[]> => {
    const [results] = await connection.execute<TourProgramDB[]>(`SELECT * FROM tour_program WHERE ready_tour_id = ?`, [readyTourId]);

    if (results.length == 0) {
        return [];
    }

    return results.map(tourProgramDB => {
        const tourProgram: TourProgram = {
            tourProgramId: tourProgramDB.tour_program_id,
            readyTourId: tourProgramDB.ready_tour_id,
            day: tourProgramDB.day,
            title: tourProgramDB.title,
            description: tourProgramDB.description,
        }

        return tourProgram
    })
}

export default {getAllTourProgramsByReadyTourId}
