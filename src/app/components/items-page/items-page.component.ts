import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
    selector: 'app-items-page',
    templateUrl: './items-page.component.html',
    styleUrls: ['./items-page.component.less']
})
export class ItemsPageComponent implements OnInit {

    categories: Category[] = [];

    constructor(private categoriesService: CategoriesService) { }

    ngOnInit(): void {
        // this.categoriesService.getAll().subscribe(res => {
            
        // });
    }

}
