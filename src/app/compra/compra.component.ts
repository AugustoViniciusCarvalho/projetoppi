import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CompraService } from '../model/compra.service';
import { IndexService } from '../model/index.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private compraService: CompraService) { };

  produto: Produto;

  index() {
    this.carrinhoService.desativar();
    this.indexService.ativar();
    this.compraService.desativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("compra", JSON.stringify(this.compraService.getAtivado()));
  }

  carrinho() {
    this.indexService.desativar();
    this.carrinhoService.ativar();
    this.compraService.desativar();
    sessionStorage.setItem("index",JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho",JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("compra",JSON.stringify(this.compraService.getAtivado()));
  }

  ngOnInit(): void {
    this.produto = JSON.parse(sessionStorage.getItem("compraProduto"));
  }

}
