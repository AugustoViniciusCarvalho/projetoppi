import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CompraService } from '../model/compra.service';
import { IndexService } from '../model/index.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private compraService: CompraService) { }

  produtos: Array<Produto>;

  @Input() item: string;

  getProdutos(){
    this.indexService.getProdutos().subscribe((res) => {
      this.produtos = res;
    });
  }

  ngOnInit(): void {
    this.getProdutos();
  }

  carrinho(){
    this.indexService.desativar();
    this.carrinhoService.ativar();
    sessionStorage.setItem("index",JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho",JSON.stringify(this.carrinhoService.getAtivado()));
  }

  compra(produto: Produto){
    this.indexService.desativar();
    this.carrinhoService.desativar();
    this.compraService.ativar();
    sessionStorage.setItem("index",JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho",JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("compra",JSON.stringify(this.compraService.getAtivado()));
    this.compraService.compra(produto);
  }

}
