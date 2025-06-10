import {Plane} from "lucide-react";
import {Card} from "@/components/Card/card.tsx";
import type { Flight } from "../../flight";

type CardFlightProps = Flight & {
    selectedFlightsState?: boolean;
    handleSelectFlight?: () => void;
}

type Airline = {
    name: string;
    imageUrl: string;
}

const AIRLINES: Airline[] = [
    {name: 'Wizz Air', imageUrl: 'src/assets/wizzAir.png'},
    {name: 'Ryanair', imageUrl: 'src/assets/ryanair.png'},
    {name: 'Lufthansa', imageUrl: 'src/assets/lufthansa.png'}
]

const CardFlight = ({
                        flightId,
                        imageUrl,
                        originCity,
                        destinationCity,
                        departAt,
                        numberOfStops,
                        arriveAt,
                        airline,
                        price,
                        selectedFlightsState,
                        handleSelectFlight
                    }: CardFlightProps) => {
    const getAirlineImage = (airlineName: string) => {
        const airline = AIRLINES.find(airline => airline.name === airlineName)

        return airline?.imageUrl
    }

    return (
        <Card key={flightId} imageUrl={imageUrl}
              alt={`Flight from ${originCity} to ${destinationCity}`}
              onClick={handleSelectFlight}
              className={`block hover:scale-[1.02] rounded-lg overflow-hidden shadow-md border-1 transition-colors duration-300 ${
                  selectedFlightsState
                      ? "border-gray-800"
                      : "border-none"
              }`}
              content={
                  <div>
                      <div className="flex flex-row items-end">
                          <div className="flex flex-col items-start flex-1">
                              <div
                                  className="text-md font-bold font-[Figtree] text-gray-700 truncate">{originCity}</div>
                              <div className="text-sm font-medium font-[Figtree] text-gray-600">
                                  {new Date(departAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })}
                              </div>
                          </div>

                          <div className="flex flex-col items-center flex-1">
                              <Plane size="20" className="rotate-90 text-gray-700" aria-hidden="true"/>
                              <div className="text-sm font-medium font-[Figtree] text-gray-600">
                                  {numberOfStops === 0 ? 'Direct' : `${numberOfStops} stop${numberOfStops > 1 ? 's' : ''}`}
                              </div>
                          </div>

                          <div className="flex flex-col items-end flex-1">
                              <div
                                  className="text-md font-bold font-[Figtree] text-gray-700 truncate">{destinationCity}</div>
                              <div className="text-sm font-medium font-[Figtree] text-gray-600">
                                  {new Date(arriveAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })}
                              </div>
                          </div>
                      </div>

                      <div className="flex flex-row justify-between items-center pt-4">
                          <div
                              className="text-md font-bold font-[Figtree] text-gray-700 text-center">€{price} /
                              per
                              person
                          </div>
                          <img
                              src={getAirlineImage(airline)}
                              alt={`${airline} logo`}
                              className="w-6 h-6 object-contain"
                          />
                      </div>
                  </div>
              }
        />
    )
}

export default CardFlight
