import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  items = [];
  itemFilters: string[] = [];
  filterSubscription: Subscription;
  itemFiltersHolder = [];

  ngOnInit(): void {
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    const fetchFilters = this.apiService
      .fetchAPI('https://jsonmockserver.vercel.app/api/blogs')
      .toPromise();

    fetchFilters
      .then((data) => {
        this.items = data;

        this.items.map((data) => this.itemFiltersHolder.push(data.type));
        this.itemFilters = this.itemFiltersHolder.filter(unique);
        console.log('Hi', this.itemFilters);
      })
      .catch((error) => {
        console.log('Promise rejected with errors');
      });
  }
}
