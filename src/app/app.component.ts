import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { Router } from "@angular/router";
import { CommentsServiceService } from "./comments-service.service";
import { PostsServiceService } from "./posts-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("commentsForm") form!: NgControl;
  postMessage: string = "";
  commentMessage: string = "";
  showPostMsg: boolean = false;
  showCommentMsg: boolean = false;
  enteredId!: number;
  showButton!: boolean;

  constructor(
    private postsService: PostsServiceService,
    private commentsService: CommentsServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showButton = false;
    this.router.navigate([""]);
    this.postsService.getPosts().subscribe();
    this.postsService.msgChanged.subscribe((data) => (this.postMessage = data));
    this.commentsService.messageChanged.subscribe(
      (data) => (this.commentMessage = data)
    );
    this.commentsService.dataChanged.subscribe(
      (data) => (this.showCommentMsg = data)
    );
  }

  showPostMessage() {
    this.showPostMsg = this.postMessage ? true : false;
  }

  showCommentMessage() {
    this.showCommentMsg = this.commentMessage ? true : false;
  }

  showComments() {
    this.postsService.id = this.enteredId;
    this.router.navigate(["comments/post", this.enteredId]);
    this.commentsService.getComments().subscribe();
    this.form.reset();
    this.showButton = true;
  }

  ngOnDestroy(): void {
    this.postsService.msgChanged.unsubscribe();
    this.commentsService.messageChanged.unsubscribe();
    this.commentsService.dataChanged.unsubscribe();
    this.postsService.postsChanged.unsubscribe();
    this.commentsService.commentsChanged.unsubscribe();
  }
}
