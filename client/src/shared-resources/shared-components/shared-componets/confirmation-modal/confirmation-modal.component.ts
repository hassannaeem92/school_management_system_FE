import { Component, EventEmitter, Output } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  confirmationModalTitle = 'Delete Confirm';
  confirmationModalBody = '';
  deleteConfirmationText = 'Are you sure you want to delete this record ?';
  deleteRecord = 'delete record'
  OkText = 'Ok';
  CancelText = 'Cancel';
  isDeleteAction: boolean = false;

  @Output() deleteEvent = new EventEmitter();
  sum = 0;
  constructor() { }

  closeModal() {
    $('#confirmation-modal').modal('hide');
  }

  sendBack() {
    this.sum = this.sum + 10;
    this.deleteEvent.emit({ name: 'Back.! ' + this.sum });
  }
}
