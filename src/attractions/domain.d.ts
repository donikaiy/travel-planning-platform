import {RowDataPacket} from "mysql2";

export type Attraction = {
    attractionId: number,
    cityId: number,
    galleryId: number,
    name: string,
    location: string,
    description: string,
    openingHours: string,
    bestTimeToVisit: string,
    ticketsWebsite: string,
    additionalInformation: string,
}

export type AttractionDB = RowDataPacket & {
    attraction_id: number,
    city_id: number,
    gallery_id: number,
    name: string,
    location: string,
    description: string,
    opening_hours: string,
    best_time_to_visit: string,
    tickets_website: string,
    additional_information: string,
}
