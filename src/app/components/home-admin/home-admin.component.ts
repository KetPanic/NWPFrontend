import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Company } from 'src/app/models/company.model';
import { Flight } from 'src/app/models/flight.model';
import { CityService } from 'src/app/services/city.service';
import { CompanyService } from 'src/app/services/company.service';
import { FlightService } from 'src/app/services/flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  public companies : Company[] = []
  public flights: Flight[] = []

  public formGroup : FormGroup

  constructor(private flightService: FlightService,
    private companyService: CompanyService, private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        flightId: ['', Validators.required],
        companyId: ['', Validators.required],
        departureDate: ['', Validators.required],
        returnDate: [''],
        count: [0, Validators.required],
        oneWay: [false],
      })
     }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.companies = companies
      console.log(this.companies)
    })
    this.flightService.getAllFlights().subscribe(flights => {
      this.flights = flights
      console.log(this.flights)
    })
  }

  public submitForm(credentials){
    console.log(credentials)
  }

}
