import { City } from "./city.model";

export interface Flight{
    id: number,
    originCity: City,
    destinationCity: City
}