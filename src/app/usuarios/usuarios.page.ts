import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {


  public usuarios: any[] = [];
  public total: number = 0;
  public texto: string ='';

  constructor(
    public servicio: ServiciosService,
    public loading: LoadingController,
    public alert: AlertController
    
    ) { }

  ngOnInit() {
   // this.getUsuarios();
  }

  ionViewWillEnter(){
    this.getUsuarios();


  }

  async getUsuarios(){
    let l = await this.loading.create();
    l.present();

    this.servicio.Usuario_Listado(this.texto)
    .subscribe((res: any)=>{
      this.usuarios = res.info.items;
      this.total = res.info.total;
     l.dismiss();
      console.log(res)  
    },(er: any)=>{
      l.dismiss();
      console.log(er)
    })
    
  }





  updateUsuario(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    this.servicio.irA('/usuario/' + item.id)
    


  }


 async deleteUsuario(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    let alert = await this.alert.create({
      header: 'Confirmación',
      message: 'Esta seguro que desea eliminar el usuario ['+ item.nombre+']?',
      buttons:[{

        text: 'Si',
        handler: async () =>
        {
          let l = await this.loading.create({
            message: "borrando"
          });
          this.servicio.Usuario_Eliminar(item.id) 
          .subscribe((data: any)=> {this.getUsuarios();
        
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
  //  this.servicio.irA('/usuario/' + item.id)
  alert.present();    

  }

}

