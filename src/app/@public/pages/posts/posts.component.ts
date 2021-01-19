import { Post } from '@admin/core/models/post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  posts: Post[] = [];
  sincePost = 0;
  totalPosts: number = 0;
  categorias: [] = [];
  
  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {

    //this.loading = true;

    this.postService.getPosts(this.sincePost).subscribe((data:any) => {

      this.totalPosts = this.postService.totalPosts;
      this.posts = data;
      //this.loading = false;
      // console.log(data);
    });
  };

  searchPost(value: string) {
    // console.log(value);


    if ( value.length <= 0  ) {
      this.getPosts() 
      return;
    }

    // this.postService.searchPost(value).subscribe( (findPost:any) => {
    //   if ( findPost.tabla ) {
    //     this.posts = findPost.tabla;
    //   }
     
    // })
  };

}
