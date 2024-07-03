import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UsersComponent } from './component/users/users.component';
import { CommentsComponent } from './component/comments/comments.component';
import { provideHttpClient } from '@angular/common/http';
import { PaginationComponent } from './component/pagination/pagination.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { AddUserComponent } from './component/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    UsersComponent,
    CommentsComponent,
    PaginationComponent,
    AddCommentComponent,
    AddUserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
