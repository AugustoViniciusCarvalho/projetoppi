import { Injectable } from '@angular/core';
import { Produto } from './Produto';

@Injectable({
  providedIn: 'root'
})
export class MontarComputadorService {

  constructor() { }

  ativado: boolean;

  getAtivado(): boolean{
    return this.ativado;
  }

  ativar(){
    this.ativado = true;
  }

  desativar(){
    this.ativado = false;
  }
}
