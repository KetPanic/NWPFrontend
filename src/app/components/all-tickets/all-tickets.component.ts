import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {

  public allTickets: Ticket[] = []
  public pageNumber: number
  public startInd: number
  public endInd: number
  public tickets: Ticket[] = []
  public step: number
  public hasNext: boolean
  public hasPrev: boolean
  public size: number

  constructor(private ticketService: TicketService) {
    this.pageNumber = 0
    this.startInd = 0
    this.endInd = 5
    this.step = 5
    this.hasNext = false;
    this.hasPrev = false;
    this.size = 0
   }

  ngOnInit(): void {
    this.ticketService.getAllTickets().subscribe(allTickets => {
      this.allTickets = allTickets
      this.size = allTickets.length
      this.hasNext = true;
      if(this.size <= this.endInd){
        this.endInd = this.size
        this.hasNext = false
      }
      this.tickets = allTickets.slice(this.startInd, this.endInd)
      console.log(allTickets)
    })
  }

  public deleteTicket(id){
    this.ticketService.deleteTicket(id).subscribe(allTickets => {
      console.log(allTickets)
      this.ticketService.getAllTickets().subscribe(allTickets => {
        this.allTickets = allTickets      
        this.size = allTickets.length
        this.hasNext = true;
        if(this.size <= this.endInd){
          this.endInd = this.size
          this.hasNext = false
        }
        this.tickets = allTickets.slice(this.startInd, this.endInd)
        
        if(this.startInd == this.endInd && this.startInd > 0){
          this.prevPage()
        }
        console.log(allTickets)
      })
    })
  }

  public prevPage(){
    
    this.startInd = this.startInd - this.step
    this.endInd = this.startInd + this.step
    this.tickets = this.allTickets.slice(this.startInd, this.endInd)
    this.hasNext = true;
    if(this.size <= this.endInd){
      this.endInd = this.size
      this.hasNext = false
    }
    if(this.startInd === 0){
      this.hasPrev = false;
    }
  }

  public nextPage(){
    this.startInd = this.startInd + this.step
    this.endInd = this.endInd + this.step
    this.size = this.allTickets.length
    this.hasNext = true;
    if(this.size <= this.endInd){
      this.endInd = this.size
      this.hasNext = false
    }
    this.tickets = this.allTickets.slice(this.startInd, this.endInd)
    this.hasPrev = true
  }

}
