import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { Camera, PictureSourceType,CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
/**
 * Generated class for the AdvertisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var provider = new firebase.auth.GoogleAuthProvider();
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {
  fname;
  Address;
  Price;
  // category;
  // eventVenue;
  selectedImage: string;
  
  fire={
    downloadUrl:''
  };
  //firebaseUploads: any;
  imageURI: any;
  pic_available: boolean;
  platform: any;
  //user
  //userObj;
  constructor(public navCtrl: NavController,private filePath: FilePath, public navParams: NavParams, private camera: Camera, 
    private actionSheetCtrl: ActionSheetController,public f: File,private toastCtrl: ToastController,public loadingCtrl: LoadingController, public plt:Platform) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisePage');
  }
  uploadPic(){
    this.takePicture();
  }
  addEvent(){
  }
  getImage(){
    var storageREf =  firebase.storage().ref('Upload').getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
      console.log("URL = " +url);
      
    }).catch(function(error) {
      // Handle any errors
      console.log(error);
    });
  }
  saveImgToFireStorage(){
    //loading bar
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    if(this.imageURI !=null){
      var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);
    console.log("Image URI ========== "+this.imageURI);
    var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
        directory = directory.split('%20').join(' ')
        name = name.split('%20').join(' ')
        console.log(directory)
        console.log('About to read buffer')
        let seperatedName = name.split('.')
        let extension = ''
        if (seperatedName.length > 1) {
          extension = '.' + seperatedName[1]
        }
    return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
      console.log(buffer)
      console.log('Uploading file')
      //var blob = new Blob([buffer], { type: mediaFile[0].type });
      var blob = new Blob([buffer], {type: 'image/jpeg'});
      console.log(blob.size);
      console.log(blob)
      const storageRef = firebase.storage().ref('upload/' + new Date().getTime() + extension);
      return storageRef.put(blob).then((snapshot:any) => {
        console.log('Upload completed')
        //this.loader.dismiss;
        //this.firebaseUploads = firebase.database().ref('/fireuploads/');
        console.log(snapshot.Q)
        console.log("snapshot = "+snapshot);
         //let  files = [];
        storageRef.getDownloadURL().then((url) => {
          this.fire.downloadUrl = url;
          console.log(url);
          //this.firebaseUploads.push({downloadUrl: url,Admin_Authentication_UID :this.userObj[0].authentication_UID,EventName:this.eventName,eventVenue:this.eventVenue, EventDate: this.eventDate,EventTime: this.eventTime, EventCategory: this.category});
          firebase.database().ref('/Adds/').push({downloadUrl: this.fire.downloadUrl,fNAme:this.fname,Address:this.Address, Price: this.Price});
          //this.navCtrl.setRoot("ViewEventPage");
          return this.fire.downloadUrl;
        });
        console.log("Download URL = "+ this.fire.downloadUrl);
        //this.firebaseUploads.push({downloadUrl: this.fire.downloadUrl,Admin_Authentication_UID :this.userObj[0].authentication_UID,EventName:this.eventName,eventVenue:this.eventVenue, EventDate: this.eventDate,EventTime: this.eventTime, EventCategory: this.category});
 ;
      })
      // return this.userService.saveProfilePicture(blob)
    }).catch(err => {
      console.log(err)
    })
    }else{
    //   this.pic_available=false
    //  var noPic = this.pic_available;
      firebase.database().ref('/Adds/').push({downloadUrl: 'none',fNAme:this.fname,Address:this.Address, Price: this.Price});
      //this.navCtrl.push("ViewEventPage");
      return this.fire.downloadUrl;
    }
  }
public takePicture(/*sourceType*/) {
    // Create options for the Camera Dialog
    //console.log("--------------> "+sourceType);
    var options = {
      quality: 100,
      //sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      
    //  if (this.platform.is('android') && options.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
           
           console.log("file Path =========== "+ filePath)
           this.imageURI = filePath;
           if(filePath != null){
            let toast = this.toastCtrl.create({
              message: 'Image successfully uploaded.',
              duration: 3000,
              position: 'middle'
            });
            toast.present();
            console.log('inside toast if')
           }
          });
      // } else {
      //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //  // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      // }
    }, (err) => {
     // this.presentToast('Error while selecting image.');
    });
  }
  logoutUser(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut().then(User =>{
      this.navCtrl.push("HomePage");
    });
  }
  
}