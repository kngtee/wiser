import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  list = [
    {
      number: 1,
      name: 'Comments',
      link: '/',
    },
    {
      number: 2,
      name: 'Users',
      link: '/users',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
