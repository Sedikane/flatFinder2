import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoBookingsPage } from './do-bookings';

@NgModule({
  declarations: [
    DoBookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoBookingsPage),
  ],
})
export class DoBookingsPageModule {}
