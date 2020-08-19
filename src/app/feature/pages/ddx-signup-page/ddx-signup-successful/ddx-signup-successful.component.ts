import { Component, OnInit } from '@angular/core';
import { DirectionService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'ddx-signup-successful',
  templateUrl: './ddx-signup-successful.component.html',
  styleUrls: ['./ddx-signup-successful.component.scss'],
})
export class SignupSuccessfulComponent implements OnInit {
  constructor(private directionService: DirectionService) {}

  ngOnInit(): void {}

  get direction$(): Observable<string> {
    return this.directionService.direction$;
  }

  onSubmit(): void {}
}
