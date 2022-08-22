import { Injectable, EventEmitter } from "@angular/core";
import { PostsServiceService } from "./posts-service.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Observable, of, Subject } from "rxjs";
import { Comment } from "./model/comment";

@Injectable({
  providedIn: "root",
})
export class CommentsServiceService {
  commentsChanged = new Subject<Comment[]>();
  messageChanged = new Subject<string>();
  dataChanged = new Subject<boolean>();

  private id!: number;
  private comments: any = [];
  private errorMsg: string = "";

  commentsUrl = "";

  constructor(
    private postsService: PostsServiceService,
    private http: HttpClient
  ) {}

  getComments(): Observable<any> {
    this.id = this.postsService.id;
    this.commentsUrl =
      "https://jsonplaceholder.typicode.com/posts/" +
      String(this.id) +
      "/comments";
    return this.http.get(this.commentsUrl).pipe(
      tap((data) => {
        this.comments = data;
        this.dataChanged.next(this.comments.length === 0);
        this.commentsChanged.next(this.comments.slice());
      }),
      catchError((error) => {
        this.errorMsg = this.getErrorMessage(error);
        this.messageChanged.next(this.errorMsg);
        return of(this.errorMsg);
      })
    );
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post(this.commentsUrl, comment).pipe(
      tap((data) => {
        this.comments.unshift(data);
        this.commentsChanged.next(this.comments.slice());
      }),
      catchError((error) => {
        this.errorMsg = this.getErrorMessage(error);
        this.messageChanged.next(this.errorMsg);
        alert(this.errorMsg);
        return of(this.errorMsg);
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return `Bad request: error status ${error.status}!`;
      }
      case 403: {
        return `Access denied: error status ${error.status}!`;
      }
      case 404: {
        return `Not found: error status ${error.status}!`;
      }

      case 500: {
        return `Internal server error: error status ${error.status}!`;
      }
      default: {
        return `Unknown error occured: error status ${error.status}!`;
      }
    }
  }

  returnComments() {
    return this.comments.slice();
  }
}
