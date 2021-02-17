import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  private ativado: boolean;

  ativar(){
    this.ativado = true;
  }

  desativar(){
    this.ativado = false;
  }

  getAtivado(){
    return this.ativado;
  }
}
