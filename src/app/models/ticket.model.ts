import { Company } from "./company.model";
import { Flight } from "./flight.model";

export interface Ticket{
    id: number,
    departureDate: Date,
    returnDate: Date,
    count: number,
    company: Company,
    flight: Flight,
    oneWay:boolean
}