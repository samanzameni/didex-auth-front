import { Component } from '@angular/core';
import { LocaleService, Locale, LocaleModel } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private localeService: LocaleService) {}

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
}
