import * as React from "react";
import type {Tour} from "@/features/tours/tour";

type ItineraryProps = {
    tour: Tour;
    selectedDay: number;
    setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

const Itinerary = ({tour, selectedDay, setSelectedDay}: ItineraryProps) => {
    const selectedDayData = tour?.tourProgram.find((tour) => tour.day === selectedDay)

    return (
        <div className="flex flex-row gap-10 lg:gap-24 items-start lg:items-center flex-1">
            <div className="relative flex flex-col items-ceter space-y-4">
                {tour?.tourProgram.map((program) => (
                    <div key={program.tourProgramId} className="flex items-center relative">
                        <button
                            onClick={() => setSelectedDay(program.day)}
                            className="flex items-center z-10"
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    selectedDay === program.day ? "bg-[#1e3a5f] text-white" : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                <span className="text-sm font-medium">{program.day}</span>
                            </div>
                        </button>
                        {selectedDay === program.day && (
                            <div
                                className="hidden lg:block absolute left-10 whitespace-nowrap font-medium text-[#1e3a5f]">
                                Day {program.day}
                            </div>
                        )}
                    </div>
                ))}
                <div className="absolute top-5 bottom-5 left-4 w-0.5 bg-gray-200 z-0"/>
            </div>

            <div>
                {selectedDayData ? (
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedDayData.title}</h3>
                        <p className="text-gray-700 text-md font-medium font-[Figtree]">
                            {selectedDayData.description}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No details available for this day.</p>
                )}
            </div>
        </div>
    )
}

export default Itinerary
