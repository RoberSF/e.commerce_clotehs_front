import { Post } from '@admin/core/models/post';
import { Component, OnInit } from '@angular/core';
// import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
// import { Router } from '@angular/router';
// import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from '../../../services/users.service';
import { basicAlert } from '../../../@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  post: Post = new Post('','','','','','','');
  categorias: [] = [];
  uploadFile: File;
  imagenTemp: any;
  open: Boolean = true

  // constructor(public postService: PostService,  public modalService: ModalService, public route: Router, public usuerService: UsuarioService) { }
  constructor(public postService: PostService,public usuerService: UsersService) { }

  ngOnInit() {

    // Obtener el Id del usuario logueado
     //this.post.idAuthor = this.usuarioService.usuario._id
  }

   submit() {

    this.postService.postPost(this.post).subscribe( result => {

      if(result.status) {
        basicAlert(TYPE_ALERT.SUCCESS, 'Post subido correctamente');
        this.post = new Post('','','','','','','')
      }

    })
     }

    subirImg() {
  
    }

    closeSelectImg() {
      this.imagenTemp = null;
      this.uploadFile = null;
      this.open = false
  
      console.log(this.imagenTemp, this.uploadFile, this.open);
    }

    saveImg() {
      this.open = false;
    }

}


