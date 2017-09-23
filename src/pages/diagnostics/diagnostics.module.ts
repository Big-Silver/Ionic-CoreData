import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnosticsPage } from './diagnostics';

@NgModule({
  declarations: [
    DiagnosticsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnosticsPage),
  ],
})
export class DiagnosticsPageModule {}
