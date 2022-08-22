import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./model/post";
import { catchError, tap } from "rxjs/operators";
import { Observable, of, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostsServiceService {
  postsChanged = new Subject<Post[]>();
  msgChanged = new Subject<string>();

  private posts: Post[] = [];
  private errorMsg: string = "";
  public id!: number;

  postsUrl: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  getPosts(): Observable<string | Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      tap((data) => {
        this.posts = data;
      }),
      catchError((error) => {
        this.errorMsg = this.getErrorMessage(error);
        this.msgChanged.next(this.errorMsg);
        return of(this.errorMsg);
      })
    );
  }

  enterPost(post: Post): Observable<string | Post> {
    return this.http.post<Post>(this.postsUrl, post).pipe(
      tap((data) => {
        this.posts.unshift(data);
        this.postsChanged.next(this.posts.slice());
      }),
      catchError((error) => {
        this.errorMsg = this.getErrorMessage(error);
        this.msgChanged.next(this.errorMsg);
        alert(this.errorMsg);
        return of(this.errorMsg);
      })
    );
  }

  returnPosts(): Post[] {
    return this.posts.slice();
  }

  getMessage(): string {
    return this.errorMsg;
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
}
