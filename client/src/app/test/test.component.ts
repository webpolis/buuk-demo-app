import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../dashboard/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit, OnDestroy {
  private subRoute;
  private subTest;
  test;
  action;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.action = params.action;

      if (typeof Number(this.action) === 'number') {
        this.getTest(Number(this.action));
      }
    });
  }

  getTest(id) {
    this.subTest = this.testService.view(id).subscribe(test => this.test = test);
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();

    if (this.subTest) {
      this.subTest.unsubscribe();
    }
  }
}
