import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { YoutubeService } from './@service/youtube.service';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
