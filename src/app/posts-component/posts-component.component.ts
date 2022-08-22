import { Component, OnInit } from "@angular/core";
import { PostsServiceService } from "../posts-service.service";
import { Post } from "../model/post";

@Component({
  selector: "app-posts-component",
  templateUrl: "./posts-component.component.html",
  styleUrls: ["./posts-component.component.css"],
})
export class PostsComponentComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsServiceService) {}

  ngOnInit(): void {
    this.posts = this.postsService.returnPosts();
    this.postsService.postsChanged.subscribe((data) => (this.posts = data));
  }
}
