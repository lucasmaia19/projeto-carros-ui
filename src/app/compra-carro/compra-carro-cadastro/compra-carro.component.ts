import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { CadastroService } from '../compra-carro-.service';
import { FormControl } from '@angular/forms';

export class Carros {
    nome?: string;
    code?: number;
}

export class CarrosDy {
    carros?: Carros[];
}

export class CompraCarro {
    id?: number;
    nome?: string;
    data?: Date;
    carros?: Carros[];
    valor?: Number;
}

@Component({
    selector: 'app-compra-carro',
    templateUrl: './compra-carro.component.html',
    styleUrls: ['./compra-carro.component.css']
})
export class AtividadeCadastroComponent implements OnInit {

    // apiUploadUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';
    // apiuploadComDadosUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';

    apiUploadUrl = 'http://localhost:8080/compra-carro';

    compraCarro = new CompraCarro();

    carrosDy = new CarrosDy();

    carrosFi = new Carros();

    // atividades: any;

    requestProgress = false;

    carrosList = new Array<Carros>();
    // faixaEtariaList = new Array<MultSelecFe>();
    // campoExperienciaList = new Array<MultSelecCe>();
    // aprendizagemDesenvolvimento = new Array<MultSelecAd>();

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private cadastroService: CadastroService,
        ) {}

    ngOnInit(): void {

        this.consultarListaCarros();
        
        const idCarro = this.route.snapshot.params['id'];
        
        console.log("idCarro", idCarro)

        if (idCarro) {
            this.carregarFormulario(idCarro);
        } else {
            this.compraCarro = { nome: 'Lucas', valor: 10.0  };
          }

            // this.editando();          
        }
        
   get editando() {
        return Boolean(this.compraCarro.id)
    }

    salvar(form: FormControl) {
        if (this.editando) {
          this.atualizar(form);
        } else {
          this.uploadComDados();
        }
      }

    carregarFormulario(id: number) {
        this.cadastroService.consultarId(id)
        .then(carro => {

        console.log("CARROS", carro.carros)

         let data = moment(carro.data, "YYYY/MM/DD");
         console.log("data", data.format("DDMMYYYY"))
         carro.data = data.toDate();
    
        this.compraCarro = carro;
        // this.compraCarro.carros = carro.carros.id
        })
      }

      atualizar(form: FormControl) {
        const idCarro = this.route.snapshot.params['id'];

        const formData = new FormData();
        
        this.compraCarro.carros = null

        let idList = '';
        for (let item of this.carrosDy.carros) {
            console.log("item.code", item.code);
            idList += item.code;
        }

        formData.append('carros', idList);

        const dados = this.compraCarro;

        Object.keys(dados).forEach(k => {
            if(dados[k] === undefined || dados[k] === null) {
                return;
            } else if (dados[k] instanceof Date) {
                let data1 = moment(this.compraCarro.data)
                let data2 = data1.format("YYYY/MM/DD")
                formData.append('data', data2)
            } else {
                formData.append(k, dados[k]);
            }
        });

        this.http.put(`http://localhost:8080/compra-carro/${idCarro}`, formData)
          .toPromise()
          .then(response => {
            this.messageService.add({severity:'success', summary:'Cadastro Atualizado com Sucesso!'});
            this.router.navigate(['']);
          })
          .catch(erro => this.messageService.add({severity:'error', summary: erro.error.message}))
          // .catch(erro => console.log(erro.error.message))
          .finally(() => this.requestProgress = false);
      }

    consultarListaCarros() {
        this.cadastroService.consultarListaCarros()
        .then(response => {
            for (var item of response) {
                const dropDownItem = { name: item.nome, code: item.id }
                this.carrosList.push(dropDownItem);
            }
        })
    }

    uploadComDados() {

        let idList = '';
        for (let item of this.carrosDy.carros) {
            console.log("item.code", item.code);
            idList += item.code;
        }

        const formData = new FormData();

        formData.append('carros', idList);
        console.log("antes da req carro", idList)

        console.log("this.compraCarro", this.compraCarro)

        const dados = this.compraCarro;
        Object.keys(dados).forEach(k => {
            if(dados[k] === undefined || dados[k] === null) {
                return;
            } else if (dados[k] instanceof Date) {
                let data1 = moment(this.compraCarro.data)
                let data2 = data1.format("YYYY/MM/DD")
                formData.append('data', data2)
            } else {
                formData.append(k, dados[k]);
            }
        });

        console.log("formData", formData)

        this.http.post(this.apiUploadUrl, formData)
        .toPromise()
        .then(response => {
            this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
            location.reload()
            })
            .catch(erro => this.messageService.add({severity:'error', summary: erro.error.message}))
            // .catch(erro => console.log(erro.error.message))
            .finally(() => this.requestProgress = false);
       }
}
