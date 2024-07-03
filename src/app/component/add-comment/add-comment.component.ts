import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { NgForm } from '@angular/forms';
import { Comment } from '../../models/comment.module';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() editComment: Comment | null = null;
  @Output() entryAdded = new EventEmitter<Comment>();
  @Output() closeModal = new EventEmitter<void>();

  comment: Comment = { id: 0, name: '', email: '', body: '' };

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    if (this.editComment) {
      this.comment = { ...this.editComment };
    }
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.editComment) {
        this.commentService.updateComment(this.comment.id, this.comment).subscribe(response => {
          this.entryAdded.emit(response);
          this.close();
        });
      } else {
        this.commentService.addComment(this.comment).subscribe(response => {
          this.entryAdded.emit(response);
          this.close();
        });
      }
    }
  }
}
