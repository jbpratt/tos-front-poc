import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu.service';
import { MenuServiceClient } from '_proto/mookies_pb_service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CreateItemComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
