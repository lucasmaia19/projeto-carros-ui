import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
// import { Atividade } from './../atividade-cadastro/atividade-cadastro.component';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CadastroService } from '../compra-carro-.service';
import * as moment from 'moment';

export class Carros {
    nome?: string;
    code?: number;
}

export class CompraCarro {
    id?: number;
    nome?: string;
    data?: Date;
    carros?: Carros[];
    valor?: Number;
}

@Component({
  selector: 'app-compra-carro-pesquisa',
  templateUrl: './compra-carro-pesquisa.component.html',
  styleUrls: ['./compra-carro-pesquisa.component.css']
})
export class AtividadePesquisaComponent implements OnInit {

    cadastros = new Array<CompraCarro>();

    carros: any;

    items: any;

    requestProgress = false;

    constructor(
        private cadastroService: CadastroService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

  ngOnInit() {

    this.requestProgress = true;
    this.listaCarros()

        this.items = [
            {
                label: 'Lançamento Compra',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                    this.router.navigate(['lancamento-compra']);
                }
            },
        ]
    }

    listaCarros() {
        this.messageService.add({severity: 'info', summary: 'Carregando carros...'});
        this.cadastroService.listaCarros()
        .then(response => {

            this.carros = response;

            this.carros.forEach(function(carros) {
                let data = moment(carros.data, "YYYY/MM/DD");
                carros.data = data.format("DD/MM/YYYY");
            })
            
            // console.log("response", response)

            // console.log("this.carros", this.carros);
            // this.router.navigate([''])
        })
        .catch(erro => this.messageService.add({severity:'error', summary:'ERRO AO CARREGAR carros'}))
        .finally(() => this.requestProgress = false);
        // this.requestProgress = false;
    }

    deletarCadastro(id: number) {
        this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir?',
            accept: () => {
            this.requestProgress = true
            this.cadastroService.deletarCadastro(id)
            .then(response => {
                this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
                console.log("Id " + id + " excluido" )
                location.reload()
                this.listaCarros

                }); 
            }
        })
        this.requestProgress = false
    }

    teste(id: number) {
        console.log("id", id)
    }

}
