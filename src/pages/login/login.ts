import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isUserLoggedIn: any = false;
  userInfo: any = {};
  login: FormGroup;

  testRadioOpen;
  testRadioResult;

 
  email;
  password;
  
  human={
  
    contactNo:"",
    password:""
  }
     loginError: string;
     userProfile: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,private alertCtrl:AlertController, public gp: GooglePlus) {
    
    this.login=this.fb.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.maxLength(25)]],
      password:['',[Validators.required,Validators.minLength(6)]],
  
    })
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
      } else { 
        this.userProfile = null; 
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logins(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(User =>{
      this.showCheckboxlogin();
      // this.navCtrl.push("UsersPage");
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
// loginWithGoogle(){
//   this.googleplus.login({
//     'webClientId': '<yourclientid>'
//   })
//     .then((res) => {
//       const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
//       this.fireauth.signInWithCredential(firecreds).then((res) => {
//         // ?this.navCtrl.setRoot('HomePage');
//         this.showCheckboxlogin();
//       }).catch((err) => {
//         alert('Firebase auth failed' + err);
//       })
      
//     }).catch((err) => {
//       alert('Error' + err);
//   })
// }

  // this.googlePlus.login({})
  // .then(res => console.log(res))
  // .catch(err => console.error(err));
  //  
  // var provider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth().signInWithPopup(provider).then(User =>{
  //   // this.navCtrl.push('UsersPage');
  //   this.showCheckboxlogin();
  // })

loginWithFacebook(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(User =>{
    // this.navCtrl.push('UsersPage');
    this.showCheckboxlogin();
  })
}
back(){
  this.navCtrl.setRoot("WelcomePage");
}
reset(){
  this.navCtrl.push("ResetPage");
   
 }
 signUp(){
  this.navCtrl.setRoot("WelcomePage")
}
loginWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(User =>{
    // this.navCtrl.push('UsersPage');
    this.showCheckboxlogin();
  })
}
// loginWithGP(){
//   this.gp.login({}).then(res=>{
//     this.userInfo=res;
//     this.isUserLoggedIn=true;
//     }).catch( err => console.log(err));
//      this.showCheckboxlogin();
//  }
 logout(){
  this.gp.logout().then( ()=>{
    this.isUserLoggedIn=false;
  });
 }
}


