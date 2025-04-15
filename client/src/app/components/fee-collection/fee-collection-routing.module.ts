import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllFeeCollectionComponent } from './all-fee-collection/all-fee-collection.component';
import { FeeInstallmentComponent } from './edit-fee-collection/fee-installment/fee-installment.component';
import { AddFeeCollectionComponent } from './add-fee-collection/add-fee-collection.component';
import { EditFeeCollectionComponent } from './edit-fee-collection/edit-fee-collection.component';

const childRoutes: Routes = [
  
  {
    path: '',
    component: FeeInstallmentComponent
  },
  
]

const routes: Routes = [

  
  {
    path: '',
    component: AllFeeCollectionComponent
  },


 {
    path: 'add',
    component: AddFeeCollectionComponent
 },
{
  path: 'edit/:id',
  component: EditFeeCollectionComponent,
  children: childRoutes
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeCollectionRoutingModule { }
