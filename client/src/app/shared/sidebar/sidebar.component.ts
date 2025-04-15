import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  activeListItem: any;

  setActiveListItem(item: string) {
    this.activeListItem = item;
  }

}
