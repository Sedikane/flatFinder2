import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
/**
 * Generated class for the DoBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var provider = new firebase.auth.GoogleAuthProvider();
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-do-bookings',
  templateUrl: 'do-bookings.html',
})
export class DoBookingsPage {
  doBookings: FormGroup;

  bookingDate;
  time;
  booking;
  bookings=[];
  bookingInfo={
  key:'',
   bookingDate:'',
   time:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder, public alertCtrl: AlertController) {
    this.doBookings=this.fb.group({
      bookingDate:[Validators.required],
      time:['',[Validators.required]],
    })

  }

  ionViewDidLoad() {


     this.bookings = [];

    firebase.database().ref('/bookingInfo/').on("value",(snapshot)=>{
      // this.bookings=[];
      snapshot.forEach((snap)=>{

     console.log(snap.val());

      // this.bookings.push(snap.val());
      console.log(snap.val().bookingDate + ' key ' + snap.key)
      this.bookings.push({bookingDate:snap.val().bookingDate, key:snap.key,time:snap.val().time});



     return false;
    });
    });
    
  }
  writeBooking(){
    console.log(this.bookingDate,this.time);

    this.bookingInfo.bookingDate=this.bookingDate;
    this.bookingInfo.time=this.time;
    var database = firebase.database();
    database.ref('/bookingInfo').push(this.bookingInfo);
    alert('Your booking is successfull');
   
  }
 
  removeBookings(booking){
    var database = firebase.database();
    database.ref('/bookingInfo/').remove();
     this.bookings = [];
    alert('You are about to cancel your booking');
  }
  
update(booking){
  this.navCtrl.push("UpdatePage",{booking:booking});
}  

  logoutUser(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut().then(User =>{
      this.navCtrl.push("HomePage");
    });
  }
}
