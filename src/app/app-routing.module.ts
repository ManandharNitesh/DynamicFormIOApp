import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFormIoFormComponent } from './edit-form-io-form/edit-form-io-form.component';

const routes: Routes = [
  { path: '', component: EditFormIoFormComponent },
  { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
