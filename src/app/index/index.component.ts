import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CheckoutService } from '../model/checkout.service';
import { IndexService } from '../model/index.service';
import { MontarComputadorService } from '../model/montar-computador.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private montarComputadorService: MontarComputadorService, private checkoutService: CheckoutService) { }

  produtos: Array<Produto>;
  produto: Produto;

  @Input() item: string;

  getProdutos(){
    this.indexService.getProdutos().subscribe((res) => {
      for (let i = 0; i < res.length; i++){
        let produto = new Produto();
        produto = res[i];
        this.indexService.getProdutoQuantidade(res[i].id).subscribe(res => {
          produto.estoque = res[0].quantidade;
          if (produto.estoque > 0){
            produto.disponivel = true;
          } else if (produto.estoque == 0){
            produto.disponivel = false;
          }
        })
        this.produtos.push(produto);
      }
      this.indexService.setCarrinho(this.produtos);
    });
  }

  ngOnInit(): void {
    this.produtos = [];
    this.getProdutos();
  }

  carrinho(){
    this.indexService.desativar();
    this.carrinhoService.ativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
  }

  montarComputador(){
    this.indexService.desativar();
    this.carrinhoService.desativar();
    this.montarComputadorService.ativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("montarComputador", JSON.stringify(this.montarComputadorService.getAtivado()));
  }

  checkout(produto: Produto, precoTotal: number){
    this.carrinhoService.desativar();
    this.indexService.desativar();
    this.checkoutService.ativar();
    this.produto = produto;
    console.log(this.produto);
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("checkout", JSON.stringify(this.checkoutService.getAtivado()));
    sessionStorage.setItem("lista", JSON.stringify(null));
    sessionStorage.setItem("listaMontarComputador", JSON.stringify(null));
    sessionStorage.setItem("listaCompra", JSON.stringify(this.produto));
    sessionStorage.setItem("precoTotal", JSON.stringify(precoTotal));
  }

}
