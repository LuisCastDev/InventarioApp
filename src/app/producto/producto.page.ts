import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public id: number = 0;
  public codigo: string = '';
  public nombre: string = '';
  public stock: number = 0;
  public precio: number = 0;
  public status: number = 0;
  
  constructor(public servicio: ServiciosService,
    public route: ActivatedRoute) {
      this.id = this.route.snapshot.params.productoId ? this.route.snapshot.params.productoId :0;
     }

  ngOnInit() {
  }

}
