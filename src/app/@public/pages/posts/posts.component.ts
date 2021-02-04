import { Post } from '@admin/core/models/post';
import { Component, OnInit } from '@angular/core';
import { SEARCH_COLOR_QUERY } from '@graphql/operations/query/color';
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

      this.totalPosts = data.info.total;
      this.posts = data.posts;
      //this.loading = false;
      // console.log(data);
    });
  };


  search(value: string) {

    if(value.length < 1) {
      this.getPosts();
    }

    this.postService.searchPost(value).subscribe( result => {
      this.posts = result.posts}
      )



  }

}
