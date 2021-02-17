import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { IndexComponent } from './index/index.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CompraComponent } from './compra/compra.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, IndexComponent, CarrinhoComponent, CompraComponent, CheckoutComponent],
  bootstrap: [AppComponent],
  providers: []
})

export class AppModule {
}