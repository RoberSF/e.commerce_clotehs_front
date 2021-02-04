import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import { UsersService } from '../../../../services/users.service';
import { Post } from '@admin/core/models/post';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  post: Post = new Post('','' , '', '', '','','',);
  
  constructor(public activatedRoute: ActivatedRoute, public postService: PostService, public route: Router) {
    this.activatedRoute.params.subscribe(params => { //Esto es para acceder a los parametros de la url 

      let id = params['id'] // como sabemos que es id? por que en el routing.module pusimos "":id"

      if ( id !== 'nuevo') {
        this.cargarPost(id)
      }
    })

    //this.role = this.userService.usuario.role;
   }

  ngOnInit(): void {
  }

  cargarPost(id :string) {
    this.postService.getPost(id).subscribe( result => {
      this.post = result.post ;
  })
};


}
