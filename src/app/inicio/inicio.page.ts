import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  productosTotal : any =[];
  clientesTotal: any;
  producto: string = '';
  usuariosTotal : any =[];


  constructor(
    public servicios: ServiciosService,
    public toast: ToastController,
    public loading: LoadingController
  ) {
    
    this.setCounter(); 
    this.getCliente();
   // this.getProductos();
   this.getUsuarios();
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.setCounter(); 
    this.getCliente();
    this.getUsuarios();
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

  async getCliente(){
    let l = await this.loading.create();
    l.present();

    this.servicios.Cliente_Listado(this.producto)
    .subscribe((res: any)=>{
      this.clientesTotal = res.info.total;
     l.dismiss();
      
    },(er: any)=>{
      l.dismiss();
      console.log(er)
    })
    console.log(this.clientesTotal);
  }
  async getUsuarios(){
    let l = await this.loading.create();
    l.present();

    this.servicios.Usuario_Listado(this.producto)
    .subscribe((res: any)=>{
      this.usuariosTotal = res.info.totalActivo;
     l.dismiss();
      
    },(er: any)=>{
      l.dismiss();
      console.log(er)
    })
    console.log(this.usuariosTotal);
  }

}
