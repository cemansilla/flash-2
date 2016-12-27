import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Flashlight } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	flashstatus:string = "...";
	txt_log:string = "";
  
  css_bg:string = "bg_white";
  css_tmp:number = 1;

  bucle_run:boolean = false;
  bucle_interval:any;

	constructor(public navCtrl: NavController) {
		this.txt_log += "Comienzo...<br>";
	}

  doBucle(){
    if(!this.bucle_run){
      this.txt_log += "Inicio bucle...<br>";

      this.bucle_run = true;

      this.bucle_interval = setInterval(() => {
        this.switchBg();
      }, 3000);
    }else{
      clearInterval(this.bucle_interval);
      this.txt_log += "Finalizo bucle...<br>";

      this.bucle_run = false;
    }
  }

  switchBg(){
    this.txt_log += "Cambio BG...<br>";

    if(this.css_tmp % 2 == 0){
      this.css_bg = "bg_red";
    }else{
      this.css_bg = "bg_white";
    }

    this.css_tmp++;
  }

	lucecilla(){
	  this.txt_log += "Lucecilla...<br>";

	  Flashlight.available().then(function (av) {
		  this.txt_log += "Available...<br>";

		  if(av){
			  this.txt_log += "Disponible...<br>";

			  Flashlight.switchOn().then(function(){
				  this.flashstatus = "ON";
				  this.txt_log += "Prendida...<br>";
			  },
			  function(){
				  this.flashstatus = "OFF (Err #1)";
				  this.txt_log += "Error en promise switchOn...<br>";
			  })

			  setTimeout(function(){
				  Flashlight.switchOff();
			  }, 3000)
		  }else{
			  this.txt_log += "Linterna no soportada...<br>";
			  this.flashstatus = "Linterna no soportada";
		  }
	  }, function (){
		  this.txt_log += "Error #2...<br>";
	  })
	  .catch(function() {
		  this.txt_log += "Catch #2...<br>";
	  })
	}
}
