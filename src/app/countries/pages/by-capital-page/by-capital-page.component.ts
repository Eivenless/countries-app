import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesServices: CountriesService) {

  }
  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCapital.countries;
    this.initialValue = this.countriesServices.cacheStore.byCapital.term;
  }

  serachByCapital(value: string): void {
    this.isLoading = true;

    this.countriesServices.searchCapital(value)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
