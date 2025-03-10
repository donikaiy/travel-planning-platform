import {RowDataPacket} from "mysql2";

export type TourProgram = {
    tourProgramId: number,
    readyTourId: number,
    day: number,
    title: string,
    description: string,
}

export type TourProgramDB = RowDataPacket & {
    tour_program_id: number,
    ready_tour_id: number,
    day: number,
    title: string,
    description: string,
}
