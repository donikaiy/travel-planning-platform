import {RowDataPacket} from "mysql2";

export type Tour = {
    readyTourId: number,
    cityId: number,
    imageUrl: string,
    name: string,
    daysNights: string,
    description: string,
    highlights: string,
};

export type TourDB = RowDataPacket & {
    ready_tour_id: number,
    city_id: number,
    image_url: string,
    name: string,
    days_nights: string,
    description: string,
    highlights: string,
};
