import { Component, OnInit, Input } from '@angular/core';
import { DataEntryDirective } from '@widget/templates';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COUNTRIES } from '@core/util/constants';
import { CountryData, DropdownSelectItem } from '@core/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'dropdown-autocomplete-countries',
  templateUrl: './dropdown-autocomplete-countries.component.html',
  styleUrls: ['./dropdown-autocomplete-countries.component.scss'],
})
export class DropdownAutocompleteCountriesComponent
  extends DataEntryDirective<string>
  implements OnInit {
  @Input() caption: string;
  @Input() control: FormControl;
  @Input() desiredValueKey: string;

  private countriesList: CountryData[];

  filteredOptions: Observable<CountryData[]>;

  constructor(private authService: AuthService) {
    super();

    this.countriesList = COUNTRIES;
    this.getTitleFromValue = this.getTitleFromValue.bind(this);
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((selected) => this._filter(selected))
    );

    if (!this.caption && this.isTraderInRegionTwo) {
      this.caption = 'انتخاب کشور';
    } else if (!this.caption) {
      this.caption = 'choose...';
    }
  }

  private _filter(selected: string): CountryData[] {
    const filterValue = selected.toLowerCase();

    return this.countriesList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  get isValid(): boolean {
    return !!this.data && this.data.length > 0;
  }

  get isTraderInRegionTwo(): boolean {
    return this.authService.decodedToken?.region === '2';
  }

  getTitleFromValue(value: string): string {
    if (!this.countriesList || !value) {
      return '';
    }

    const result = this.countriesList.find(
      (item) => item[this.desiredValueKey] === value
    );
    if (!result) {
      return '';
    }

    return result.name;
  }
}
