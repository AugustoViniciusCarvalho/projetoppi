import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './Produto';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) {
    this.carrinho = [];
  }

  private ativado: boolean;

  private carrinho: Array<Produto>;

  url = "http://localhost:3000";

  getProdutos(): Observable<any>{
    return this.http.get(`${this.url}/produtos`)
  }

  getProdutoTipo(tipo: number): Observable<any>{
    return this.http.get(`${this.url}/produtos/${tipo}`);
  }

  getProdutoQuantidade(produto: number){
    return this.http.get(`${this.url}/estoque/${produto}`);
  }

  patchProduto(quantidade: number, id: number){
    return this.http.patch(`${this.url}/estoque/`,{quantidade: quantidade, id: id});
  }

  ativar() {
    this.ativado = true;
  }

  desativar() {
    this.ativado = false;
  }

  getAtivado(): boolean {
    return this.ativado;
  }

  adicionarCarrinho(produto: Produto) {
    produto.quantidade = 1;
    let existe = new Array<Produto>();
    for (let i = 0; i < this.carrinho.length; i++) {
      if (this.carrinho[i].nome == produto.nome) {
        existe.push(this.carrinho[i]);
      }
    }
    if (existe.length > 0) {
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].nome == produto.nome) {
          if (this.carrinho[i].quantidade < this.carrinho[i].estoque){
            this.carrinho[i].quantidade = this.carrinho[i].quantidade + 1;
            sessionStorage.setItem("lista", JSON.stringify(this.carrinho));
            alert("Unidade extra adicionada ao carrinho");
          } else {
            alert("Não existem mais unidades desse produto no estoque");
          }
        }
      }
    } else {
      this.carrinho.push(produto);
      sessionStorage.setItem("lista", JSON.stringify(this.carrinho));
      alert("Produto adicionado ao carrinho");
    }
  }

  setCarrinho(carrinho: Array<Produto>){
    this.carrinho = carrinho;
  }

  getCarrinho(): Array<Produto>{
    return this.carrinho;
  }
  
}
