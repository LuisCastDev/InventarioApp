import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.presetacionTerminada();
    this.getTitle();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }



  cfgCompletado: boolean = false;

  Elenmanuel: any;
  Erickson:any;
  Luis: any;
  
  
  presetacionTerminada(){
  this.cfgCompletado = true;
  
  }
  
  
   getTitle(){
    
   if (this.cfgCompletado == true)
  { 
    this.Elenmanuel = 'Elenmanuel, ';
    this.Erickson = " Erickson y ";
    this.Luis = "Luis ya son  ingenieros en software";
    console.log(this.Elenmanuel,this.Erickson,this.Luis);
  }
  else{
  
    console.log("");
  
  }
  }
  


}

