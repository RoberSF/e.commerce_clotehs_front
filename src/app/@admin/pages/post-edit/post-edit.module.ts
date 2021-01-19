import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostEditRoutingModule } from './post-edit-routing.module';
import { PostEditComponent } from './post-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [PostEditComponent],
  imports: [
    CommonModule,
    PostEditRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule, 
    MatInputModule, 
    MatButtonModule,
    EditorModule,
    FormsModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class PostEditModule { }
