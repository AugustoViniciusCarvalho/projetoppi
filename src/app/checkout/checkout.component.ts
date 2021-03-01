import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CheckoutService } from '../model/checkout.service';
import { IndexService } from '../model/index.service';
import { MontarComputadorService } from '../model/montar-computador.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private checkoutService: CheckoutService, private montarComputadorService: MontarComputadorService) { }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem("lista")) != null){
      this.produtos = JSON.parse(sessionStorage.getItem("lista"));
      this.precoTotal = JSON.parse(sessionStorage.getItem("precoTotal"));
    } else if (JSON.parse(sessionStorage.getItem("listaCompra")) != null){
      this.produtos = [];
      this.produtos.push(JSON.parse(sessionStorage.getItem("listaCompra")));
      this.produtos[0].quantidade = 1;
      this.precoTotal = JSON.parse(sessionStorage.getItem("precoTotal"));
    } else if (JSON.parse(sessionStorage.getItem("listaMontarComputador")) != null){
      this.produtos = JSON.parse(sessionStorage.getItem("listaMontarComputador"));
      this.precoTotal = JSON.parse(sessionStorage.getItem("precoTotal"));
      for (let i = 0; i < this.produtos.length; i++){
        this.produtos[i].quantidade = 1;
      }
    }

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

  montarComputador(){
    this.indexService.desativar();
    this.carrinhoService.desativar();
    this.checkoutService.desativar();
    this.montarComputadorService.ativar();
    sessionStorage.setItem("index",JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho",JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("montarComputador",JSON.stringify(this.montarComputadorService.getAtivado()));
  }

  concluirCompra(){
    for (let i = 0; i < this.produtos.length; i++){
      this.indexService.patchProduto(this.produtos[i].estoque, this.produtos[i].id).subscribe(res => {
        console.log(JSON.parse(JSON.stringify(res)).retorno);
      });
    }
    alert("Compra efetuada com sucesso");
    sessionStorage.setItem("lista", JSON.stringify(""));
    this.index();
  }

}
