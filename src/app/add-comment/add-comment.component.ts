import { Component, OnInit, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentsServiceService } from "../comments-service.service";
import { Comment } from "../model/comment";
import { PostsServiceService } from "../posts-service.service";

@Component({
  selector: "app-add-comment",
  templateUrl: "./add-comment.component.html",
  styleUrls: ["./add-comment.component.css"],
})
export class AddCommentComponent implements OnInit {
  comment: Comment = { postId: 0, id: 0, name: "", email: "", body: "" };
  @ViewChild("addCommentForm") form!: NgControl;

  constructor(
    private commentsService: CommentsServiceService,
    private postsService: PostsServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  submitComment() {
    this.comment.postId = this.postsService.id;
    this.commentsService.addComment(this.comment).subscribe();
    this.form.reset();
  }
}
