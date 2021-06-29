import { AtividadeCadastroComponent } from './compra-carro/compra-carro-cadastro/compra-carro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'atividade-cadastro', component: AtividadeCadastroComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
