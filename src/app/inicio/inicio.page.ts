import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  productosTotal : any;
  clientesTotal: any;
  producto: string = '';



  constructor(
    public servicios: ServiciosService,
    public toast: ToastController,
    public loading: LoadingController
  ) {   this.setCounter(); }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.setCounter();
  }

 async setCounter(){
   let l = await this.loading.create();
   l.present();

    this.servicios.Producto_Listado(this.producto).subscribe((data:any)=>{
      this.productosTotal = data.info.totalActivo;
      console.log(this.productosTotal);
      l.dismiss();
    },(error:any)=>{
      console.log(error);
      l.dismiss();
    });


  }
}
