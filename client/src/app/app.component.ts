import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagintaion } from './shared/models/pagination';
import { ShopServiceService } from './core/services/shop-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private shopService = inject(ShopServiceService);
  title = 'Zona-Ecommerce';
  products: Product[] = [];

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: response => this.products = response.data,
      error: error => console.error(error),
    })
  }
}
