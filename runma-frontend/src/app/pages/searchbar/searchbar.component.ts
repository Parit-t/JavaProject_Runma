import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchbarResult, SearchbarService } from 'src/app/services/searchbar.service';

@Component({
  selector: 'searchbarcomponent',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  searchbarForm!: FormGroup;

  constructor(private searchbarService: SearchbarService, private builder: FormBuilder) { }
data!:SearchbarResult[]
  ngOnInit(): void {
    this.searchbarForm = this.builder.group({
      name: [''],
      province: [''],
      distance: ['']
    });



  }
  onSubmit(): void {
    console.log('submit');
    this.searchbarService.getAllEvent(this.searchbarForm.value).subscribe(data => {
      this.data = data;
      console.log(data);
     
    }, err => {
      console.log(err);
    })
  }

clearData():void{
  console.log('cleardata');

}


  // eventList!: SearchbarResult[];


  // getAllEvent(): void {
  //   this.searchbarService.getAllEvent().subscribe(
  //     (data) => {
  //       this.eventList = data;
  //       console.log(this.eventList);
  //     }
  //   )
  // }





}
