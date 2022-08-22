import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CommentsServiceService } from "../comments-service.service";
import { PostsServiceService } from "../posts-service.service";

@Component({
  selector: "app-comments-component",
  templateUrl: "./comments-component.component.html",
})
export class CommentsComponentComponent implements OnInit, OnDestroy {
  comments: any = [];
  enteredId: number = this.postsService.id;

  constructor(
    private postsService: PostsServiceService,
    private commentsService: CommentsServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.comments = this.commentsService.returnComments();
    this.commentsService.commentsChanged.subscribe(
      (data) => (this.comments = data)
    );
  }

  addComment() {
    this.router.navigate(["add"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.commentsService.commentsChanged.unsubscribe();
  }
}
