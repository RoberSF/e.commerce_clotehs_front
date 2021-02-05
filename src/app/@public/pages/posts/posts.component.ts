import { Post } from '@admin/core/models/post';
import { Component, OnInit } from '@angular/core';
import { SEARCH_COLOR_QUERY } from '@graphql/operations/query/color';
import { IInfoPage } from '@shop/core/Interfaces/IResultData';
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
  infoPage: IInfoPage;
  
  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPerPage: 5,
      total: 1
    }
    this.getPosts();

  }

  getPosts() {

    //this.loading = true;
    this.postService.getPosts(this.infoPage.page, this.infoPage.itemsPerPage).subscribe((data:any) => {

      this.totalPosts = data.info.total;
      this.infoPage = data.info
      this.posts = data.posts;
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

  changePage() {
    this.getPosts();
  }

}
