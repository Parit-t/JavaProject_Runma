import { Component, Input, OnInit } from '@angular/core';
import { SearchbarResult } from 'src/app/services/searchbar.service';

@Component({
  selector: 'searchresultcomponent',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  
  @Input()
  datafromsearchbar!: Array<SearchbarResult>;

ngOnInit(): void {}

}
