import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  tests;
  summary;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.getTests();
    this.getSummary();
  }

  getTests() {
    this.testService.list().subscribe(tests => this.tests = tests);
  }

  getSummary() {
    this.testService.summary().subscribe(summary => this.summary = summary);
  }
}
