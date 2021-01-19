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
  role: string;
  
  constructor(public activatedRoute: ActivatedRoute, public postService: PostService, public route: Router, public userService: UsersService) {
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
    this.postService.getPost(id).subscribe( post => {
      this.post = post ;
  })
};

deletePost(_id:any) {

  // swal({
  //   title: "Está seguro?",
  //   text: "Una vez borrada tendrá que volver a crearlo!",
  //   icon: "warning",
  //   buttons: ["Cancelar", "Borra cita"],
  //   dangerMode: true,
  // })
  // .then((willDelete) => {
   
  //   if ( willDelete) {
  //     this.postService.deletePost(_id).subscribe( (deletedPost) => {
  //       this.route.navigate(['/blog']);
  //     })
  //   } 

  // });

}

}
