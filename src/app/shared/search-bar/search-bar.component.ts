import { Component } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  showSearchBar = false;
  search: string | undefined;

  constructor(searchBarService: SearchBarService) {
    searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });
  }

  submit(){}

  endSearch(){
    this.showSearchBar = false;
  }
}
