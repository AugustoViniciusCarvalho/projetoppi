import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CheckoutService } from '../model/checkout.service';
import { IndexService } from '../model/index.service';
import { MontarComputadorService } from '../model/montar-computador.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService, private indexService: IndexService, private checkoutService: CheckoutService, private montarComputadorService: MontarComputadorService) { 
    this.precoTotal = 0;
  }

  ngOnInit(): void {
    this.carrinho = JSON.parse(sessionStorage.getItem("lista"));
    if (this.carrinho == null){
      this.carrinho = [];
    }
    this.getPreco();
  }

  carrinho: Array<Produto>;

  precoTotal: number;

  getPreco(){
    for(let i = 0; i < this.carrinho.length; i++){
      this.precoTotal = this.precoTotal + (this.carrinho[i].valor * this.carrinho[i].quantidade);
    }
  }

  index() {
    this.carrinhoService.desativar();
    this.indexService.ativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
  }

  montarComputador(){
    this.indexService.desativar();
    this.carrinhoService.desativar();
    this.montarComputadorService.ativar();
    sessionStorage.setItem("index",JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho",JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("montarComputador",JSON.stringify(this.montarComputadorService.getAtivado()));
  }

  excluirItem(produto: Produto) {
    for (let i = 0; i < this.carrinho.length; i++) {
      if (this.carrinho[i] == produto) {
        this.precoTotal = this.precoTotal - (this.carrinho[i].valor * this.carrinho[i].quantidade);
        this.carrinho.splice(this.carrinho.indexOf(produto), 1);
      }
    }
    sessionStorage.setItem("lista", JSON.stringify(this.carrinho));
    this.indexService.setProdutosEnviar(this.carrinho);
  }

  aumentar(produto: Produto) {
    for (let i = 0; i < this.carrinho.length; i++) {
      if (this.carrinho[i].nome == produto.nome) {
        if (this.carrinho[i].quantidade < this.carrinho[i].estoque){
          this.carrinho[i].quantidade = this.carrinho[i].quantidade + 1;
          sessionStorage.setItem("lista", JSON.stringify(this.carrinho));
          this.precoTotal = this.precoTotal + this.carrinho[i].valor;
          this.indexService.setProdutosEnviar(this.carrinho);
        } else {
          alert("Não existem mais unidades desse produto no estoque");
        }
      }
    }
  }

  diminuir(produto: Produto) {
    for (let i = 0; i < this.carrinho.length; i++) {
      if (this.carrinho[i].nome == produto.nome) {
        if (this.carrinho[i].quantidade > 1) {
          this.carrinho[i].quantidade = this.carrinho[i].quantidade - 1;
          sessionStorage.setItem("lista", JSON.stringify(this.carrinho));
          this.precoTotal = this.precoTotal - this.carrinho[i].valor;
          this.indexService.setProdutosEnviar(this.carrinho);
        }
      }
    }
  }

  checkout(precoTotal: number){
    this.carrinhoService.desativar();
    this.indexService.desativar();
    this.checkoutService.ativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("checkout", JSON.stringify(this.checkoutService.getAtivado()));
    sessionStorage.setItem("listaCompra", null);
    sessionStorage.setItem("precoTotal", JSON.stringify(this.precoTotal));
  }
}
