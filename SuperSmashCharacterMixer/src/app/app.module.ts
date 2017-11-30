import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';

//angular material
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule,} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { PlayerTileComponent } from './player-tile/player-tile.component';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    PlayerTileComponent,
  ],
  imports: [
    BrowserModule,
    //angular material imports
    MatButtonModule, 
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    NoopAnimationsModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
