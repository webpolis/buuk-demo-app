import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TestService } from './test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  tests;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.testService.list().subscribe(tests => this.tests = tests);
  }
}
