import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.module';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  paginatedComments: Comment[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;
  currentPage: number = 1;
  isModalVisible: boolean = false;
  editComment: Comment | null = null;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.comments = comments;
      this.totalItems = comments.length;
      this.updatePaginatedComments();
    });
  }

  updatePaginatedComments() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedComments = this.comments.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedComments();
  }

  openModal(comment?: Comment) {
    this.isModalVisible = true;
    this.editComment = comment || null;
  }

  closeModal() {
    this.isModalVisible = false;
    this.editComment = null;
  }

  onEntryAdded(comment: Comment) {

    if(this.editComment){
      const index = this.comments.findIndex(c => c.id === this.editComment!.id)
      if(index > -1){
        this.comments[index] = comment;
      }
    } else{
      this.comments.push(comment);
    }

    
    this.totalItems = this.comments.length;
    this.updatePaginatedComments();
    this.closeModal();
  }
}
