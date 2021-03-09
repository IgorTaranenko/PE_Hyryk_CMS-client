import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

    isNew: boolean = true;
    categoryForm: FormGroup;
    image: File;
    imagePreview: any = '';
    category: Category;
    modalRef: BsModalRef;
    @ViewChild('imgInput') inputRef: ElementRef;

    constructor(
        private route: ActivatedRoute, private categoriesService: CategoriesService,
        private messageService: MessageService, public loaderService: LoaderService,
        private modalService: BsModalService, private router: Router, private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.categoryForm = new FormGroup({
            name: new FormControl(null, Validators.required)
        })        
        this.route.params
            .pipe(
                switchMap(
                    (params: Params) => {
                        if (params['id']) {
                            this.isNew = false;
                            setTimeout(() => {
                                this.loaderService.startGlobalLoading();
                            }, 0)
                            return this.categoriesService.getCategory(params['id']);
                        }
                        return of(null);
                    }
                )
            )
            .subscribe((category: Category) => {
                if (category) {
                    this.category = category;
                    this.categoryForm.patchValue({
                        name: category.name
                    });
                    this.imagePreview = category.imgSrc;
                    this.loaderService.stopGlobalLoading();
                }
            }, error => {
                this.messageService.open(error.error.message);
                this.loaderService.stopGlobalLoading();
            })
    }

    

    triggerClick() {
        this.inputRef.nativeElement.click();
    }
    onFileUpload(event: any) {
        const file = event.target.files[0];
        this.image = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        }

        reader.readAsDataURL(file);
    }

    deleteCategory(): void {
        this.modalRef = this.modalService.show(ConfirmDeleteComponent, Object.assign({}, { class: 'confirm-delete' }));
        this.modalRef.content.isDelete.subscribe(res => {
            if (res) {
                this.loaderService.startGlobalLoading();
                this.categoriesService.delete(this.category._id).subscribe(() => {
                    this.router.navigate(['/items'], {
                        queryParams: {
                            isDeleted: true
                        }
                    });
                })
            }
        })
    }

    onSubmit() {
        let obs$: Observable<Category>;
        this.loaderService.startGlobalLoading();
        if (this.isNew) {
            obs$ = this.categoriesService.create(this.categoryForm.value.name, this.image);
        } else {
            obs$ = this.categoriesService.update(this.category._id, this.categoryForm.value.name, this.image);
        }
        obs$.subscribe(
            (category: Category) => {
                this.category = category;
                if (this.isNew) {
                    this.loaderService.stopGlobalLoading();
                    this.router.navigate(['/items'], {
                        queryParams: {
                            created: true
                        }
                    });
                } else {
                    this.messageService.open("Изменения сохранены");
                    this.loaderService.stopGlobalLoading();
                }
            },
            e => {
                this.loaderService.stopGlobalLoading();
            }
        )
    }
}
