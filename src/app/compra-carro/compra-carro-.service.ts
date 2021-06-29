import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompraCarro } from './compra-carro-pesquisa/compra-carro-pesquisa.component';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    urlBase = environment.urlBase;

    constructor(private http: HttpClient) { }

    consultarListaCarros(): Promise<any> {

        return this.http.get(this.urlBase + '/carros')
            .toPromise()
            // .then(response => {console.log("response", response)});
            .then(response => {return response});
    }

    listaCarros() {
        return this.http.get(this.urlBase + '/compra-carro')
            .toPromise()
            .then(response => {return response});
    }
 
    deletarCadastro(id: number): Promise<any> {

        return this.http.delete(this.urlBase + `compra-carro/${id}`)
            .toPromise()
            .then(response => {return response})
    }

    consultarId(id: number): Promise<any>{
        return this.http.get(this.urlBase + `compra-carro/${id}`)
        .toPromise()
        .then(response => {
          return response;
        });

      }

      // atualizar(compraCarro: FormData): Promise<any> {
        atualizar(compraCarro: FormData)  {
        console.log("id service", compraCarro)
      //  return this.http.put(this.urlBase + `compra-carro/${compraCarro.id}`, compraCarro)
        // .toPromise()
        // .then(response => {
          // console.log("response", response)
          let response
          return response;
        // });
      }

}
