import {RowDataPacket} from "mysql2";

export type ReadyTour = {
    readyTourId: number,
    cityId: number,
    galleryId: number,
    name: string,
    daysNights: string,
    description: string,
    highlights: string,
};

export type ReadyTourDB = RowDataPacket & {
    ready_tour_id: number,
    city_id: number,
    gallery_id: number,
    name: string,
    days_nights: string,
    description: string,
    highlights: string,
};
