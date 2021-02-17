import { Injectable } from '@angular/core';
import { IndexService } from './index.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() {
  }

  private ativado: boolean;

  ativar(){
    this.ativado = true;
  }

  desativar(){
    this.ativado = false;
  }

  getAtivado(): boolean{
    return this.ativado;
  }
}
