import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentsServiceService } from '../comments-service.service';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-comments-component',
  templateUrl: './comments-component.component.html',
})
export class CommentsComponentComponent implements OnInit {
  comments: any = [];
  enteredId: number = this.postsService.id;

  constructor(
    private postsService: PostsServiceService,
    private commentsService: CommentsServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.comments = this.commentsService.returnComments();
    this.commentsService.commentsChanged.subscribe(
      (data) => (this.comments = data)
    );
  }

  addComment() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
