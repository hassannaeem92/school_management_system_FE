import { Component, OnInit, AfterViewInit  } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  constructor() {
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
  ngAfterViewInit() {

    $("#input-pr").fileinput({
      uploadUrl: "/file-upload-batch/1",
      uploadAsync: false,
      minFileCount: 2,
      maxFileCount: 5,
      overwriteInitial: false,
      initialPreview: [
        // IMAGE RAW MARKUP
        '<img src="https://picsum.photos/id/239/1920/1080" class="kv-preview-data file-preview-image">',
        // IMAGE RAW MARKUP
        '<img src="https://picsum.photos/id/279/1920/1080" class="kv-preview-data file-preview-image">',
        // TEXT RAW MARKUP
        '<textarea class="kv-preview-data file-preview-text font-monospace" readonly>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut mauris ut libero fermentum feugiat eu et dui. Mauris condimentum rhoncus enim, sed semper neque vestibulum id. Nulla semper, turpis ut consequat imperdiet, enim turpis aliquet orci, eget venenatis elit sapien non ante. Aliquam neque ipsum, rhoncus id ipsum et, volutpat tincidunt augue. Maecenas dolor libero, gravida nec est at, commodo tempor massa. Sed id feugiat massa. Pellentesque at est eu ante aliquam viverra ac sed est.</textarea>'
      ],
      initialPreviewAsData: false, // allows you to set raw markup
      initialPreviewFileType: 'image', // image is the default and can be overridden in config below
      initialPreviewDownloadUrl: 'https://picsum.photos/id/{key}/1920/1080', // includes the dynamic key tag to be replaced for each config
      initialPreviewConfig: [
        { type: "image", caption: "Image-1.jpg", description: "<h5>Number One</h5> This is a representative placeholder description # 1 for this image.", size: 847000, url: "/site/file-delete", key: 1 },
        { type: "image", caption: "Image-2.jpg", description: "<h5>Number Two</h5> This is a representative placeholder description # 2 for this image.", size: 817000, url: "/site/file-delete", key: 2 },  // set as raw markup
        { type: "text", description: "<h5>Number Three</h5> This is a representative placeholder description # 3 for this text file.", size: 1430, caption: "LoremIpsum.txt", url: "/site/file-delete", key: 3 }
      ]
    })
  }
}
