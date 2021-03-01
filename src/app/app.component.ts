import { JsonpClientBackend } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Component, Injectable, Input, VERSION } from '@angular/core';
import { CarrinhoService } from './model/carrinho.service';
import { CheckoutService } from './model/checkout.service';
import { CompraService } from './model/compra.service';
import { IndexService } from './model/index.service';
import { MontarComputadorService } from './model/montar-computador.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  currentItem = "television";

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private compraService: CompraService, private checkoutService: CheckoutService, private montarComputadorService: MontarComputadorService){
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
    } else if(JSON.parse(sessionStorage.getItem("carrinho")) == false){
      this.carrinhoService.desativar();
    } else if(JSON.parse(sessionStorage.getItem("carrinho")) == undefined){
      this.carrinhoService.desativar();
    }

    if(JSON.parse(sessionStorage.getItem("compra")) == true){
      this.compraService.ativar();
    } else if(JSON.parse(sessionStorage.getItem("compra")) == false){
      this.compraService.desativar();
    } else if(JSON.parse(sessionStorage.getItem("compra")) == undefined){
      this.compraService.desativar();
    }

    if(JSON.parse(sessionStorage.getItem("checkout")) == true){
      this.checkoutService.ativar();
    } else if(JSON.parse(sessionStorage.getItem("checkout")) == false){
      this.checkoutService.desativar();
    } else if(JSON.parse(sessionStorage.getItem("checkout")) == undefined){
      this.checkoutService.desativar();
    }

    if(JSON.parse(sessionStorage.getItem("montarComputador")) == true){
      this.montarComputadorService.ativar();
    } else if (JSON.parse(sessionStorage.getItem("montarComputador")) == false){
      this.montarComputadorService.desativar();
    } else if (JSON.parse(sessionStorage.getItem("montarComputador")) == undefined){
      this.montarComputadorService.desativar();
    }
  }
}