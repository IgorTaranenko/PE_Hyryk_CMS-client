import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
    selector: 'app-items-page',
    templateUrl: './items-page.component.html',
    styleUrls: ['./items-page.component.less']
})
export class ItemsPageComponent implements OnInit {

    categories$: Observable<Category[]>;

    constructor(private categoriesService: CategoriesService) { }

    ngOnInit(): void {
        this.categories$ = this.categoriesService.getAll();
    }

}
