import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subList;
  private subSummary;
  tests;
  summary;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.getTests();
    this.getSummary();
  }

  getTests() {
    this.subList = this.testService.list().subscribe(tests => this.tests = tests);
  }

  getSummary() {
    this.subSummary = this.testService.summary().subscribe(summary => this.summary = summary);
  }

  ngOnDestroy() {
    this.subList.unsubscribe();
    this.subSummary.unsubscribe();
  }
}
