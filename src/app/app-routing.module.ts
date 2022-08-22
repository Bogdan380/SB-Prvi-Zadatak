import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsComponentComponent } from './comments-component/comments-component.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponentComponent,
  },
  {
    path: 'comments/post/:id',
    component: CommentsComponentComponent,
    children: [{ path: 'add', component: AddCommentComponent }],
  },
  {
    path: '',
    redirectTo: 'AppComponent',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
