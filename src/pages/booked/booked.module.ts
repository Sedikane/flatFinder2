import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookedPage } from './booked';

@NgModule({
  declarations: [
    BookedPage,
  ],
  imports: [
    IonicPageModule.forChild(BookedPage),
  ],
})
export class BookedPageModule {}
