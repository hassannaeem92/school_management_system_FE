import { ToastrService } from 'ngx-toastr';
declare const $: any;
declare const mApp: any;
import * as Noty from 'noty';




export class Utils {
    yesText = 'YES';
    noText = 'NO';
    languageOrientation: any;
    constructor(private toastr: ToastrService,
    ) {

    }

   public notification(text: any, type: any) {
         if (type == 'error') {
            this.toastr.success('text', 'Toastr fun!');  
        }
    }

    // public static notification(text: any, type: any) {

    //     // if (type == 'error') {
              
    //     // }


    //     // // if (!localStorage.getItem('languageOrientation') || localStorage.getItem('languageOrientation') === 'LTR') {
    //     //     new Noty({
    //     //         text,
    //     //         theme: 'metroui',
    //     //         layout: 'topRight',
    //     //         type,
    //     //         timeout: 2000,
    //     //     }).show();
    //     // // } else {
    //     // //     new Noty({
    //     // //         text,
    //     // //         theme: 'metroui',
    //     // //         layout: 'topLeft',
    //     // //         type,
    //     // //         timeout: 2000,
    //     // //     }).show();
    //     // // }

    // }

    public static notificationWithTimeAndPosition(text: any, type: any, time: any, position: any) {

        // if (!localStorage.getItem('languageOrientation') || localStorage.getItem('languageOrientation') === 'LTR') {
            new Noty({
                text,
                theme: 'metroui',
                layout: 'topRight',
                type,
                timeout: time,
            }).show();
        // } else {
        //     new Noty({
        //         text,
        //         theme: 'metroui',
        //         layout: 'topLeft',
        //         type,
        //         timeout: time,
        //     }).show();
        // }

    // }
    }

    // For Loader------------------------->
    public static showLoader(element: any) {
        mApp.showLoader(element);
    }

    public static hideLoader(element: any) {
        mApp.hideLoader(element);
    }

    // For Multi-select------------------->
    public static onOpen(labelId: any) {
        const elem: any = document.getElementById(labelId);
        elem.classList.remove('colorchange');
        elem.classList.add('mystyle');
    }

    // public static onItemSelect(labelId) {
    //     const elem: HTMLElement = document.getElementById(labelId);
    //     elem ? elem.classList.add('mystyle') : false;
    // }

    // public static onItemDeSelect(labelId, selectId) {
    //     const elem: HTMLElement = document.getElementById(labelId);
    //     if (elem) {
    //         if (elem.classList.contains('single-select-lable')) {
    //             if ($('#' + selectId).children().find('.c-btn span span').length !== 1) {
    //                 elem.classList.add('mystyle');
    //             } else {
    //                 elem.classList.remove('mystyle');
    //             }
    //         } else {
    //             if (($('#' + selectId).children().find('.c-list div').length !== 1)) {
    //                 elem.classList.add('mystyle');
    //             } else {
    //                 elem.classList.remove('mystyle');
    //             }
    //         }
    //     }
    // }

    // public static onSelectAll(labelId) {
    //     const elem: HTMLElement = document.getElementById(labelId);
    //     elem.classList.add('mystyle');
    // }

    // public static onDeSelectAll(labelId) {
    //     const elem: HTMLElement = document.getElementById(labelId);
    //     elem ? elem.classList.remove('mystyle') : false;
    // }

    // public static onClose(labelId, selectId?) {
    //     const elem: HTMLElement = document.getElementById(labelId);
    //     if (elem) {
    //         if (elem.classList.contains('single-select-lable')) {
    //             if ($('#' + selectId).children().find('.c-btn span span').length !== 1) {
    //                 // elem.classList.add("colorchange");
    //                 elem.classList.remove('mystyle');
    //             } else {
    //                 // elem.classList.add("colorchange");
    //                 elem.classList.add('mystyle');
    //             }
    //         } else {
    //             if (($('#' + selectId).children().find('.c-list div').length)) {
    //                 // elem.classList.add("colorchange");
    //                 elem.classList.add('mystyle');
    //             } else {
    //                 // elem.classList.add("colorchange");
    //                 elem.classList.remove('mystyle');
    //             }
    //         }
    //     }
    // }

    // public static onclear() {
    //     // $('.c-btn').each(function (i, v) {
    //     //     if ($(this).children().first().children().length == 1) {
    //     //         $(this).parent().parent().parent().prev().addClass('mystyle');
    //     //     } else {
    //     //         $(this).parent().parent().parent().prev().removeClass('mystyle');
    //     //     }
    //     // });
    // }

    // public static selectedValue(labelId) {
    //     const elem: HTMLElement = document.getElementById(labelId);
    //     elem.classList.add('colorchange');
    // }

    // public static alert(type: string) {
    //     const confrimTxt: any = Constants.confirmationText;
    //     return swal.fire({
    //         'title': confrimTxt,
    //         'text': Constants.are_You_Sure_You_Want_To + ' ' + `${type}?`,
    //         'icon': 'warning',
    //         'showCancelButton': true,
    //         'confirmButtonText': Constants.YesText,
    //         'cancelButtonText': Constants.NoText,
    //         'allowOutsideClick': false,
    //         'allowEscapeKey': false,
    //     })
    // }
}

