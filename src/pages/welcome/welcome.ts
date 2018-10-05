import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// var provider = new firebase.auth.GoogleAuthProvider();
// var provider = new firebase.auth.FacebookAuthProvider();
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  welcome: FormGroup;

  display = 0;
  signup:boolean=false;
  logins:boolean=false;
  
  fname;
  lname;
  email;
  password;
  contactNo;
  human={
    fname:"",
    lname:"",
    contactNo:"",
    password:""
  }
     loginError: string;

     testRadioOpen;
  testRadioResult;
  flatList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,private alertCtrl:AlertController) {
    this.welcome=this.fb.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.maxLength(25)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      contactNo:['',[Validators.required,Validators.maxLength(10)]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(User =>{
      this.showCheckboxlogin();
      // this.navCtrl.push("UsersPage");
    })
  }

  submit(){
    this.display = 1;
  }
  signups(){
    firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
    this.display = 1;
    })
  }
  showCheckboxlogin() {
    let alert = this.alertCtrl.create();
    alert.setMessage('Please choose ');
    alert.setTitle('You need to');
 
 
 
    alert.addButton({
 
      text: 'Book to review',
 
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
       
        this.navCtrl.setRoot("DoBookingsPage")
       //this.landLordsignup()
      }});
 
    alert.addButton({
 
      text: 'Advertise flat',
 
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      //console.log( this.testRadioResult.value);
        this.navCtrl.setRoot("AdvertisePage")
      
      }});
    //alert.addButton('Cancel');
  /*  alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.navCtrl.setRoot("SignupPage");
      }
    });*/
    alert.present();
 }
loginWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(User =>{
    // this.navCtrl.push('UsersPage');
    this.showCheckboxlogin();
  })
}
loginWithFacebook(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(User =>{
    // this.navCtrl.push('UsersPage');
    this.showCheckboxlogin();
  })
}
reset(){
  this.navCtrl.push("ResetPage");
   
 }
 signUp(){
  this.navCtrl.setRoot("WelcomePage");
}
}
