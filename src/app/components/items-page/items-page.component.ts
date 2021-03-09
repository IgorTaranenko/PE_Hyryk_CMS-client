import { query } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
    selector: 'app-items-page',
    templateUrl: './items-page.component.html',
    styleUrls: ['./items-page.component.less']
})
export class ItemsPageComponent implements OnInit {

    categories: Category[];

    constructor(
        private categoriesService: CategoriesService, private loadingService: LoaderService,
        private route: ActivatedRoute, private messageService: MessageService
    ) { 
        this.loadingService.startGlobalLoading();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(queryParams => {
            if (queryParams.isDeleted) {
                this.messageService.open("Категория успешно удалена!");
            }
            if (queryParams.created) {
                this.messageService.open("Категория успешно создана!");
            }
        })        
        this.categoriesService.getAll().subscribe(res => {
            this.categories = res;
            this.loadingService.stopGlobalLoading();
        }, () => {
            this.loadingService.stopGlobalLoading();
        })
    }
}
