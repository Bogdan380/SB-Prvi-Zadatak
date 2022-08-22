import { Component, OnInit } from '@angular/core';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css'],
})
export class PostsComponentComponent implements OnInit {
  posts: any = [];

  constructor(private postsService: PostsServiceService) {}

  ngOnInit() {
    this.posts = this.postsService.returnPosts();
    this.postsService.postsChanged.subscribe((data) => (this.posts = data));
  }
}
