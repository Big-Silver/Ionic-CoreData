import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LpcreportPage } from '../pages/lpcreport/lpcreport';
import { MapsPage } from '../pages/maps/maps';
import { DiagnosticsPage } from '../pages/diagnostics/diagnostics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LpcreportPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'LPC Reports', component: LpcreportPage },
      { title: 'Maps', component: MapsPage },
      { title: 'Diagnostics', component: DiagnosticsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component, {title: page.title});
  }
}
