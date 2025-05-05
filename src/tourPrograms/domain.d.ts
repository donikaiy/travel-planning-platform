import {RowDataPacket} from "mysql2";

export type TourProgram = {
    tourProgramId: number,
    tourId: number,
    day: number,
    title: string,
    description: string,
}

export type TourProgramDB = RowDataPacket & {
    tour_program_id: number,
    tour_id: number,
    day: number,
    title: string,
    description: string,
}
