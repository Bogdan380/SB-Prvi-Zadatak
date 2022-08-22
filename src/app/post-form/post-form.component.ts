import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../model/post';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  post: Post = new Post(0, 0, '', '');
  @ViewChild('postForm') form: any;

  constructor(private postsService: PostsServiceService) {}

  ngOnInit(): void {}

  submitPost() {
    this.postsService.enterPost(this.post).subscribe();
    this.form.reset();
  }
}
