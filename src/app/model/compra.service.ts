import { Injectable } from '@angular/core';
import { Produto } from './Produto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private ativado: boolean;

  getAtivado(): boolean{
    return this.ativado;
  }

  ativar(){
    this.ativado = true;
  }

  desativar(){
    this.ativado = false;
  }

  compra(produto: Produto){
    sessionStorage.setItem("compraProduto", JSON.stringify(produto));
  }
}
