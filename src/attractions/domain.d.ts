import {RowDataPacket} from "mysql2";

export type Attraction = {
    attractionId: number,
    cityId: number,
    name: string,
    location: string,
    imageUrl: string,
    description: string,
    openingHours: string,
    bestTimeToVisit: string,
    ticketsWebsite: string,
    additionalInformation: string,
}

export type AttractionDb = RowDataPacket & {
    attraction_id: number,
    city_id: number,
    name: string,
    location: string,
    image_url: string,
    description: string,
    opening_hours: string,
    best_time_to_visit: string,
    tickets_website: string,
    additional_information: string,
}
