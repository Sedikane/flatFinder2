import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController,MenuController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  loginBtn = 1;
  signupBtn = 1;
  chocolate = 0;

  email:string;
  password:string;
  testRadioOpen;
  testRadioResult;
  flatList = [];
  count:number = 0;

  userId;
  contactNo;
  fname = "Not signed in.";
  role;
  userDetails;
  landID


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,public menuCtrl: MenuController,public loadingCtrl: LoadingController) {
    this.userId = this.navParams.get("userId");
    if( this.userId){
      this.chocolate = this.navParams.get("openMenu");
      this.contactNo = this.navParams.get("contactNo");
      this.fname = this.navParams.get("fname");
      this.userDetails = this.navParams.get("lname");
      this.landID = this.navParams.get("landID");
      this.loginBtn = 0;
      this.signupBtn = 0;
      console.log("Contact :",this.contactNo);
  console.log("fname :",this.fname);
    console.log("userId ======",this.userId);
    console.log("chocoloate",this.chocolate);   
      console.log("user details ===="+this.fname);
  
    }
    this.getImage();
  }

  presentLoading(count:number) {
    const loader = this.loadingCtrl.create({
      spinner:"bubbles",
      content: "Please wait...",
      duration: count
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    this.userId = this.navParams.get("userId");
    if( this.userId){
      this.chocolate = this.navParams.get("openMenu");
    }
  
    console.log("userId ======",this.userId);
    console.log("chocolate",this.chocolate);

  }
book(){
  this.navCtrl.push('WelcomePage')
}

showCheckbox() {
  let alert = this.alertCtrl.create();
  alert.setMessage('Please choose one  ');
  alert.setTitle('What are you looking for? ');

  alert.addButton({
 
    text: 'I am looking for Tenants',

    handler: data => {
      this.testRadioOpen = false;
      this.testRadioResult = data;
      this.navCtrl.setRoot("WelcomePage");
     //this.landLordsignup()
    }});

  alert.addButton({

    text: 'I am looking for a Flat',

    handler: data => {
      this.testRadioOpen = false;
      this.testRadioResult = data;
    //console.log( this.testRadioResult.value);
      this.navCtrl.setRoot("WelcomePage");
    
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
Admin(){

 
  
  // firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
  //   console.log('sign up page');

   
  // })
  this.navCtrl.push("SignupPage")

    
  }
  client(){
    this.navCtrl.push("ClientPage");

  }
  login(){
    this.navCtrl.setRoot("LoginPage")
   
  }
  signup(){
   this.navCtrl.push("WelcomePage");
  }
  reset(){
    this.navCtrl.push("ResetPage");
  }
  
  showCheckboxlogin() {
    let alert = this.alertCtrl.create();
    alert.setMessage('Please choose ');
    alert.setTitle('Login as ');
 
 
 
    alert.addButton({
 
      text: 'Tenants Login',
 
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
       
        this.navCtrl.setRoot("TenatLoginPage")
       //this.landLordsignup()
      }});
 
    alert.addButton({
 
      text: 'Client Login',
 
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      //console.log( this.testRadioResult.value);
        this.navCtrl.setRoot("LoginPage")
      
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
 getImage(){
  //this.count =0;
   firebase.database().ref('/Flats/').on('value', (snapshot) =>
 {
    
   var counter = 3000;
   this.presentLoading(counter+this.count);
   snapshot.forEach((snap) => 
   { 
     //Initializing Item;
     /*this.item._key = snap.key;
     this.item.name = snap.val().c_itemName;*/
     //Adding Item to itemsList
       
     this.count+=1000;
     counter = counter+this.count;
     
     this.flatList.push({landID:snap.val().landID,contactNo:snap.val().contactNo,downloadUrl:snap.val().downloadUrl,flatname: snap.val().flatname, description:snap.val().description,Address: snap.val().Address, Price : snap.val().Price,_key : snap.val()._key});
    //  this.flatList.push({_key : snap.key, fname: snap.val().fNAme, Address: snap.val().Address, Price : snap.val().Price, downloadUrl: snap.val().downloadUrl});
    console.log(snap.val().downloadUrl);
    console.log(this.flatList);
  
     return false;
   });
   
   console.log("count = "+this.count);
 });
 }
 ve(){
  this.chocolate =1;
}
getFlatDetails(flat:any){
console.log(flat.fname);
this.landID = flat.landID;
this.navCtrl.push("FlatDetailsPage",{flat:flat,landID:this.landID,userId:this.userId});
}

doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}

openMenu()
{
  this.menuCtrl.open();
}

closeMenu(){
  this.menuCtrl.close();
}
addFlat(){
  if(this.userId){

    this.navCtrl.push("AdvertisePage",{userId:this.userId,contactNo:this.contactNo,fname:this.fname});
  }else{
    this.navCtrl.push("LoginPage");
  }
}
}
