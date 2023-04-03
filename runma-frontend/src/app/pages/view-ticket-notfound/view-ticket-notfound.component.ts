import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'view-ticket-notfound',
  templateUrl: './view-ticket-notfound.component.html',
  styleUrls: ['./view-ticket-notfound.component.css']
})
export class ViewTicketNotfoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToHome(){
    this.router.navigateByUrl(``);
  }

}
