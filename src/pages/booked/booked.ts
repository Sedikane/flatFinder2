import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booked',
  templateUrl: 'booked.html',
})
export class BookedPage {
booking;
value: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.booking = this.navParams.get('booking');
   
    this.value = this.booking.bookingDate;
   this.value = this.booking.time;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookedPage');
  }

}
