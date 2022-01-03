import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';
import { ServiciosService } from '../servicios.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {


  public Clientes: any[] = [];
  public total: number = 0;
  public texto: string ='';

  constructor(
    public servicio: ServiciosService,
    public loading: LoadingController,
    public alert: AlertController
    
    ) { }

  ngOnInit() {
   // this.getClientes();
  }

  ionViewWillEnter(){
    this.getClientes();


  }

  async getClientes(){
    let l = await this.loading.create();
    l.present();

    this.servicio.Cliente_Listado(this.texto)
    .subscribe((res: any)=>{
      this.Clientes = res.info.items;
      this.total = res.info.total;
     l.dismiss();
      console.log(res)  
    },(er: any)=>{
      l.dismiss();
      console.log(er)
    })
    
  }





  updateCliente(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    this.servicio.irA('/cliente/' + item.id)
    


  }


 async deleteCliente(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    let alert = await this.alert.create({
      header: 'Confirmación',
      message: 'Esta seguro que desea eliminar el Cliente ['+ item.nombre+']?',
      buttons:[{

        text: 'Si',
        handler: async () =>
        {
          let l = await this.loading.create({
            message: "borrando"
          });
          this.servicio.Cliente_Eliminar(item.id) 
          .subscribe((data: any)=> {this.getClientes();
        
            l.dismiss();
            console.log(data);
          },
           (error : any)=>
           {
             console.log(error);
            l.dismiss();
          
          })



        }


       },
      {

        text: 'No',
        handler: () =>
        {}


      }
    ]




    });
  //  this.servicio.irA('/Cliente/' + item.id)
  alert.present();    

  }

}

