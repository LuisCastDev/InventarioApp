import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

   export class FolderPage  {
    public folder: string;
  cfgCompletado: boolean = false;
  Elenmanuel: any;
  Erickson:any;
  Luis: any;
   
  presetacionTerminada()
  {
  this.cfgCompletado = true;
  }
     getTitle(){    
   if (this.cfgCompletado == true)
  { 
    this.Elenmanuel = 'Elenmanuel, ';    this.Erickson = " Erickson y ";
    this.Luis = "Luis ya son  ingenieros en software";
    console.log(this.Elenmanuel,this.Erickson,this.Luis);
  }
  else{
      console.log("Elenmanuel, Erickson y Luis no dieron todo su potencial");
    }
  }
	constructor(){
 this.presetacionTerminada();
    this.getTitle();
  }
}