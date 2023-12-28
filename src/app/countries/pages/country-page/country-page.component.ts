import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesServices: CountriesService,
  ) { }

  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe(({ id }) => {
  //       this.countriesServices.searchCountryByAlphaCode(id)
  //         .subscribe(countries => {
  //           console.log(countries);
  //         })
  //     })
  // }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesServices.searchCountryByAlphaCode(id)),
      )
      .subscribe(country => {
        if (!country) return this.router.navigateByUrl('');
        return this.country = country;
      })
  }

}
