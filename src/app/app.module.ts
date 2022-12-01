import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CdnSrcPipe } from './cdn-src.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CdnSrcPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
