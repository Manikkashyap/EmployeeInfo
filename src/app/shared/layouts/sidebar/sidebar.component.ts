import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showProspects:boolean = false;
  showUsers:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
