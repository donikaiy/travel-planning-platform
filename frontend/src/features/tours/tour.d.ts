import {Hotel} from "@/features/hotels/hotel";
import {Restaurant} from "@/features/restaurants/restaurant";
import {Attraction} from "@/features/attractions/attraction";

export type TourInfo = {
    tourId: number,
    cityId: number,
    imageUrl: string,
    name: string,
    daysNights: string,
    description: string,
    highlights: string,
    rating?: number,
};

export type Tour = TourInfo & {
    tourProgram: TourProgram[],
    hotels?: Hotel[],
    restaurants?: Restaurant[],
    attractions?: Attraction[]
}

export type TourProgram = {
    tourProgramId: number,
    tourId: number,
    day: number,
    title: string,
    description: string,
}
