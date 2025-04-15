import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Page } from 'src/shared-resources/page';
import { Constants } from '../Constants';
declare const $: any;

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent {
  delete = Constants.delete;
  ddPageSize = 5;
  tableViewtext = Constants.tableViewtext;
  IMPORT = Constants.importText;
  DOWNLOAD_TEMPLATE = Constants.downloadTemplateText;
  btnCancelText = Constants.btnCancelText;


  @Input() page: any;
  @Input() isShowImportDownloadBtn: boolean = false;
  @Output() clickEventImportDownloadBtn = new EventEmitter<any>()
  @Input() isImportShow: boolean = true;
  @Input() isDownloadTemplateShow: boolean = true;
  @Input() showPaginate: boolean = true;

  @Input() isDeleteShow: boolean = true;
  @Input() selected: any;
  @Output() changePageSizeEvent = new EventEmitter<any>();
  // @Input() onCancelURL: string = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['page'] && changes['page'].currentValue) {
      this.page = changes['page'].currentValue;
      this.ddPageSize = this.page.size
    }
  }

  ngOnInit() {
    this.ddPageSize = this.page.size
  }

  /**
   * To change page size
   * @param event 
   */
  changePageSize(event: any) {
    
    this.page
    this.ddPageSize = event;
    this.changePageSizeEvent.emit(event);
  }

  clickEvent(event: any) {
    this.clickEventImportDownloadBtn.emit(event)
  }

  // deleteClick() {
  //   debugger
  //   console.log('JJ')
  //   $('#confirmation-modal').modal('show');
  // }

}
