export type Attraction = AttractionCreate & {
    attractionId: number,
}

export type AttractionCreate = {
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
