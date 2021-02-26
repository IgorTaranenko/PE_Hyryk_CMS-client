import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

    isNew: boolean = false;
    categoryForm: FormGroup;

    constructor(
        private route: ActivatedRoute, private categoriesService: CategoriesService,
        private messageService: MessageService, public loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.categoryForm = new FormGroup({
            name: new FormControl(null, Validators.required)
        })
        // this.route.params.subscribe((params: Params) => {
        //     if (params['id']) {
        //         this.isNew = false;
        //     } else {
        //         this.isNew = true;
        //     }
        // });
        this.loaderService.startLocalLoading();
        this.route.params
            .pipe(switchMap((params: Params) => {
                if (params['id']) {
                    this.isNew = false;
                    return this.categoriesService.getCategory(params['id']);
                }
                return of(null);
            }))
            .subscribe(category => {
                if (category) {
                    this.categoryForm.patchValue({
                        name: category.name
                    });
                }
                this.loaderService.stopLocalLoading();
            }, error => {
                this.messageService.open(error.error.message);
            })
    }

    onSubmit() {

    }
}
