import { JsonpClientBackend } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Component, Injectable, Input, VERSION } from '@angular/core';
import { CarrinhoService } from './model/carrinho.service';
import { CheckoutService } from './model/checkout.service';
import { CompraService } from './model/compra.service';
import { IndexService } from './model/index.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  currentItem = "television";

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private compraService: CompraService, private checkoutService: CheckoutService){
  }

  ngOnInit(){
    if(JSON.parse(sessionStorage.getItem("index")) == true){
      this.indexService.ativar();
      console.log(this.indexService.getAtivado());
    } else if(JSON.parse(sessionStorage.getItem("index")) == false){
      this.indexService.desativar();
      console.log(this.indexService.getAtivado());
    } else if(JSON.parse(sessionStorage.getItem("index")) == undefined){
      this.indexService.ativar();
    }
    
    if(JSON.parse(sessionStorage.getItem("carrinho")) == true){
      this.carrinhoService.ativar();
      this.carrinhoService.getAtivado();
    } else if(JSON.parse(sessionStorage.getItem("carrinho")) == false){
      this.carrinhoService.desativar();
      this.carrinhoService.getAtivado();
    } else if(JSON.parse(sessionStorage.getItem("carrinho")) == undefined){
      this.carrinhoService.desativar();
    }

    if(JSON.parse(sessionStorage.getItem("compra")) == true){
      this.compraService.ativar();
      this.compraService.getAtivado();
    } else if(JSON.parse(sessionStorage.getItem("compra")) == false){
      this.compraService.desativar();
      this.compraService.getAtivado();
    } else if(JSON.parse(sessionStorage.getItem("compra")) == undefined){
      this.compraService.desativar();
    }

    if(JSON.parse(sessionStorage.getItem("checkout")) == true){
      this.checkoutService.ativar();
      this.checkoutService.getAtivado();
    } else if(JSON.parse(sessionStorage.getItem("checkout")) == false){
      this.checkoutService.desativar();
      this.checkoutService.getAtivado();
    } else if(JSON.parse(sessionStorage.getItem("checkout")) == undefined){
      this.checkoutService.desativar();
    }
  }
}