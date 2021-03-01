import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../model/carrinho.service';
import { CheckoutService } from '../model/checkout.service';
import { IndexService } from '../model/index.service';
import { MontarComputadorService } from '../model/montar-computador.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-montar-computador',
  templateUrl: './montar-computador.component.html',
  styleUrls: ['./montar-computador.component.css']
})
export class MontarComputadorComponent implements OnInit {

  constructor(private indexService: IndexService, private carrinhoService: CarrinhoService, private montarComputadorService: MontarComputadorService, private checkoutService: CheckoutService) {
    this.produtosEscolhidos = [];
  }

  processadores: Array<Produto>;
  placasDeVideo: Array<Produto>;
  placasMae: Array<Produto>;
  memorias: Array<Produto>;
  fontes: Array<Produto>;
  gabinetes: Array<Produto>;
  precoTotal: number;
  produtosEscolhidos: Array<Produto>;

  ngOnInit(): void {
    this.processadores = [];
    this.indexService.getProdutoTipo(1).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        let processador = new Produto();
        processador = res[i];
        for (let i = 0; i < this.indexService.getCarrinho().length; i++) {
          if (processador.nome == this.indexService.getCarrinho()[i].nome) {
            processador.estoque = this.indexService.getCarrinho()[i].estoque;
          }
        }
        this.processadores.push(processador);
      }
    })
    this.placasDeVideo = [];
    this.indexService.getProdutoTipo(2).subscribe(res => {
      for (let i = 0; i < res.length; i++){
        let placaDeVideo = new Produto();
        placaDeVideo = res[i];
        for (let i = 0; i < this.indexService.getCarrinho().length; i++) {
          if (placaDeVideo.nome == this.indexService.getCarrinho()[i].nome) {
            placaDeVideo.estoque = this.indexService.getCarrinho()[i].estoque;
          }
        }
        this.placasDeVideo.push(placaDeVideo);
      }
    })
    this.placasMae = [];
    this.indexService.getProdutoTipo(3).subscribe(res => {
      for (let i = 0; i < res.length; i++){
        let placaMae = new Produto();
        placaMae = res[i];
        for (let i = 0; i < this.indexService.getCarrinho().length; i++){
          if (placaMae.nome == this.indexService.getCarrinho()[i].nome){
            placaMae.estoque = this.indexService.getCarrinho()[i].estoque;
          }
        }
        this.placasMae.push(placaMae);
      }
    })
    this.memorias = [];
    this.indexService.getProdutoTipo(4).subscribe(res => {
      for (let i = 0; i < res.length; i++){
        let memoria = new Produto();
        memoria = res[i];
        for (let i = 0; i < this.indexService.getCarrinho().length; i++){
          if (memoria.nome == this.indexService.getCarrinho()[i].nome){
            memoria.estoque = this.indexService.getCarrinho()[i].estoque;
          }
        }
        this.memorias.push(memoria);
      }
    })
    this.fontes = [];
    this.indexService.getProdutoTipo(5).subscribe(res => {
      for (let i = 0; i < res.length; i++){
        let fonte = new Produto();
        fonte = res[i];
        for (let i = 0; i < this.indexService.getCarrinho().length; i++){
          if (fonte.nome == this.indexService.getCarrinho()[i].nome){
            fonte.estoque = this.indexService.getCarrinho()[i].estoque;
          }
        }
        this.fontes.push(fonte);
      }
    })
    this.gabinetes = [];
    this.indexService.getProdutoTipo(6).subscribe(res => {
      for (let i = 0; i < res.length; i++){
        let gabinete = new Produto();
        gabinete = res[i];
        for (let i = 0; i < this.indexService.getCarrinho().length; i++){
          if (gabinete.nome == this.indexService.getCarrinho()[i].nome){
            gabinete.estoque = this.indexService.getCarrinho()[i].estoque;
          }
        }
        this.gabinetes.push(gabinete);
      }
    })
  }

  carrinho() {
    this.indexService.desativar();
    this.carrinhoService.ativar();
    this.montarComputadorService.desativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("montarComputador", JSON.stringify(this.montarComputadorService.getAtivado()));
  }

  index() {
    this.carrinhoService.desativar();
    this.indexService.ativar();
    this.montarComputadorService.desativar();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("montarComputador", JSON.stringify(this.montarComputadorService.getAtivado()));
  }

  escolherProduto(produto: Produto, tipo: number) {
    let existe = 0;
    for (let i = 0; i < this.produtosEscolhidos.length; i++) {
      if (this.produtosEscolhidos[i].tipo == tipo) {
        existe = existe + 1;
      }
    }
    if (existe == 0) {
      if (produto.estoque > 0) {
        this.produtosEscolhidos.push(produto);
        alert("Peça escolhida");
      } else if (produto.estoque == 0) {
        alert("Este produto está indisponível");
      }
    } else if (existe > 0) {
      for (let i = 0; i < this.produtosEscolhidos.length; i++) {
        if (this.produtosEscolhidos[i].tipo == tipo) {
          if (produto.estoque > 0) {
            this.produtosEscolhidos.splice(i, 1);
            this.produtosEscolhidos.push(produto);
            alert("Peça escolhida");
          } else if (produto.estoque == 0) {
            alert("Este produto está indisponível");
          }
        }
      }
    }
  }

  calcularTotal() {
    let retorno = 0;
    for (let i = 0; i < this.produtosEscolhidos.length; i++) {
      retorno = retorno + this.produtosEscolhidos[i].valor;
    }
    this.precoTotal = retorno;
  }

  checkout(precoTotal: number) {
    this.carrinhoService.desativar();
    this.indexService.desativar();
    this.checkoutService.ativar();
    this.montarComputadorService.desativar();
    this.calcularTotal();
    sessionStorage.setItem("index", JSON.stringify(this.indexService.getAtivado()));
    sessionStorage.setItem("carrinho", JSON.stringify(this.carrinhoService.getAtivado()));
    sessionStorage.setItem("checkout", JSON.stringify(this.checkoutService.getAtivado()));
    sessionStorage.setItem("montarComputador", JSON.stringify(this.montarComputadorService.getAtivado()));;
    sessionStorage.setItem("precoTotal", JSON.stringify(this.precoTotal));
    sessionStorage.setItem("lista", JSON.stringify(null));
    sessionStorage.setItem("listaCompra", JSON.stringify(null));
    sessionStorage.setItem("listaMontarComputador", JSON.stringify(this.produtosEscolhidos));
  }

}
