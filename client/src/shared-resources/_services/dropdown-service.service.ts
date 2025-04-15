import { Injectable } from '@angular/core';
import { Constants } from '../shared-components/shared-componets/Constants';
@Injectable({
  providedIn: 'root'
})
export class DropdownServiceService {



  singleSelectSetting: any;
  multiSelectSetting: any;
  singleSelectSettingDisable: any;
  multiSelectSettingDisable: any;
  lazyLoadSingleSelect: any;
  lazyLoadSingleSelectDisabled: any;
  lazyLoadMultiSelect: any;
  multiSelectSettingGroup: any;
  noDataLabel: any;	
  search = Constants.search;
  selectAll = Constants.selectAll;
  unselectAll = Constants.unselectAll;
  noData = Constants.EmptyMessage;

  constructor() {
    this.singleSelectSetting = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      searchPlaceholderText: this.search,
      noDataLabel: this.noData,
      //maxHeight: 150,
      classes: 'myclass custom-class',
      autoPosition: false,
      //position: 'bottom',
      enableFilterSelectAll: false
    };
    
    this.lazyLoadSingleSelect = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      autoPosition: false,
      noDataLabel: this.noData,
      classes: 'myclass custom-class',
      searchPlaceholderText: this.search,
      lazyLoading: true
    };

    this.lazyLoadSingleSelectDisabled = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      noDataLabel: this.noData,
      searchPlaceholderText: this.search,
      lazyLoading: true,
      disabled: true
    };

    this.lazyLoadMultiSelect = {
      singleSelection: false,
      text: '',
      selectAllText: this.selectAll,
      autoPosition: false,
      unSelectAllText: this.unselectAll,
      enableSearchFilter: true,
      noDataLabel: this.noData,
      classes: 'myclass custom-class',
      searchPlaceholderText: this.search,
      badgeShowLimit: 1,
      lazyLoading: true
    };

    this.singleSelectSettingDisable = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      noDataLabel: this.noData,
      classes: 'myclass custom-class',
      searchPlaceholderText: this.search,
      disabled: true
    };

    this.multiSelectSetting = {
      singleSelection: false,
      text: '',
      selectAllText: this.selectAll,
      unSelectAllText: this.unselectAll,
      enableSearchFilter: true,
      noDataLabel: this.noData,
      autoPosition: false,
      classes: "myclass custom-class",
      searchPlaceholderText: this.search,
      badgeShowLimit: 1
    };

    this.multiSelectSettingDisable = {
      singleSelection: false,
      text: '',
      selectAllText: this.selectAll,
      unSelectAllText: this.unselectAll,
      enableSearchFilter: true,
      noDataLabel: this.noData,
      autoPosition: false,
      classes: 'myclass custom-class',
      searchPlaceholderText: this.search,
      lazyLoading: true,
      disabled: true,
      badgeShowLimit: 1
    };

    this.multiSelectSettingGroup = {
      singleSelection: false,
      text: '',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 1,
      autoPosition: false,
      groupBy: "category",
      selectAllText: this.selectAll,
      unSelectAllText: this.unselectAll,
      searchPlaceholderText: this.search,
    };
  }


}
