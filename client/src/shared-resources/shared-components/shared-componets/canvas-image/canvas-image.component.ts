import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input, SimpleChanges, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-canvas-image',
  templateUrl: './canvas-image.component.html',
  styleUrls: ['./canvas-image.component.css']
})
export class CanvasImageComponent implements OnInit{
  @ViewChild('myButton', { static: false }) browseBtn: any;
  webcamra: any;
  isCameraExist: any = true;
  showWebCam: any = true;
  errors: any = [];
  getPicture: any;
  WebcamImage: any;
  capturedImage: any = '';
  browseImage: any;

  @Output() ImageResponse = new EventEmitter();
  @Output() takeResponse = new EventEmitter();
  @Output() changeOccure = new EventEmitter();
  
  @Input() isUpdateClicked: boolean = false;
  @Input() isTakePicClicked: boolean = false;
  @Input() isOpenCamClicked: boolean = false;
  @Input() isBrowseClicked: boolean = false;

  
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | String> = new Subject<boolean | String>;


  //@ViewChild('webcamElement') webcamElement: any;
  constructor(private toastr: ToastrService, private renderer: Renderer2,
    private ngxService: NgxUiLoaderService,

  ) {

  }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevice: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevice && mediaDevice.length > 0;
        
     }
   )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUpdateClicked'] && changes['isUpdateClicked'].currentValue) {
      if (this.isUpdateClicked) {
        this.ImageResponse.emit(this.capturedImage);
        
      }
    }

    if (changes['isTakePicClicked'] && changes['isTakePicClicked'].currentValue) {
      this.ngxService.start()

      if (this.isTakePicClicked) {
        this.takeSnapShot();
        
      }
    }

    if (changes['isOpenCamClicked'] && changes['isOpenCamClicked'].currentValue) {
      if (this.isOpenCamClicked) {
        this.OpenCamera();
        
      }
    }

    if (changes['isBrowseClicked'] && changes['isBrowseClicked'].currentValue) {
      if (this.isBrowseClicked) {
        this.renderer.selectRootElement(this.browseBtn.nativeElement).click();
        
      }
    }


  }

  public takeSnapShot(): void {
    this.ngxService.stop()

   this.changeOccure.emit(true);
    //  this.trigger.next();
     this.trigger.next(void 0);
  }

  onOffCam() {
    this.showWebCam = !this.showWebCam;
  }
  
  videoWidth = 640;
  videoHeight = 480;
  
  showCamera = false;

  handleImage(webcamImage: any) {
    
    // this.WebcamImage = webcamImage;
    this.capturedImage = webcamImage.imageAsDataUrl;
    
    this.takeResponse.emit(this.capturedImage);
    
   // this.getPicture.emit(webcamImage)
    this.showWebCam = false
    
    //this.errors.push(error);
  } 

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
    console.error('Error initializing webcam:', error);
  }

  changeWebCam(deviceID: boolean | string) {
    
    this.nextWebcam.next(deviceID);
  }

  captureImage() {
    // Trigger image capture manually
    const webcamComponent: any = document.querySelector('ngx-webcam');
    webcamComponent.capture();


  }

  // get triggerObservable(): Observable<void> {
  //   
  //   return this.trigger.asObservable();
  // }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  get nextWebCamObservable(): Observable<any>{
    return this.nextWebcam.asObservable();
  }


  toggleCamera() {
    this.showCamera = !this.showCamera;
  }
  
  OpenCamera() {
    this.capturedImage = '';
    this.showWebCam = true;
    this.changeOccure.emit(true)

    
  }

  onSelectFile(event: any) {
    
    this.capturedImage = '';
    if (event.target.files && event.target.files[0]) {
      let fileSelect = event.target.files[0];
      var reader = new FileReader();

      if (
        (fileSelect.type == "image/png" ||
          fileSelect.type == "image/jpg" ||
          fileSelect.type == "image/jpeg"
         )
      ) { } else {

        
        this.toastr.success('Allowed File Types Are:  PNG, JPG, JPEG', 'error');
        this.changeOccure.emit(true)
        return
      }

      // if ((event.target.files[0].size / 1048576) > this.checkSize) {

      //   Utils.notification(`${this.fields['MAXIMUM_ALLOWED_FILE_SIZE']['fieldValue'] + this.size}`, 'error');
      //   return false;
      // }

      this.capturedImage = event.target.files[0];



      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { 
        this.capturedImage = reader.result as string;
        this.showWebCam = false;
        // this.changeOccure.emit(true);
      }
    }
  }


}
