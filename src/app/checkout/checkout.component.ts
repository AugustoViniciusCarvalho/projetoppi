import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CheckoutService } from '../model/checkout.service';
import { IndexService } from '../model/index.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.produtos = JSON.parse(sessionStorage.getItem("lista"));
    this.precoTotal = JSON.parse(sessionStorage.getItem("precoTotal"));
  }

  produtos: Array<Produto>;
  precoTotal: number;

  index() {
    this.carrinhoService.desativar();
    this.indexService.ativar();
    this.checkoutService.desativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("checkout",JSON.stringify(this.checkoutService.getAtivado()));
  }

  carrinho(){
    this.carrinhoService.ativar();
    this.indexService.desativar();
    this.checkoutService.desativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("checkout", JSON.stringify(this.checkoutService.getAtivado()));
  }

}
