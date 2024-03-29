import { Component, OnInit } from '@angular/core';
import {
  LocaleService,
  Locale,
  LocaleModel,
  DirectionService,
  Direction,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localeService: LocaleService,
    private directionService: DirectionService
  ) {}

  ngOnInit(): void {
    const body = document.querySelector('body');
    this.directionService.direction$.subscribe((dir) => {
      body.setAttribute('dir', dir);
    });

    this.localeService.locale$.subscribe((locale) => {
      body.classList.value = locale;
    });
  }

  handleLocaleChange($event: Locale): void {
    this.localeService.changeLocale($event);
    window.location.reload();
  }

  get availableLocales(): LocaleModel[] {
    return this.localeService.availableLocales;
  }

  get currentLocaleModel(): LocaleModel {
    return this.localeService.currentLocaleModel;
  }

  get direction$(): Observable<Direction> {
    return this.directionService.direction$;
  }

  get locale$(): Observable<Locale> {
    return this.localeService.locale$;
  }
}
