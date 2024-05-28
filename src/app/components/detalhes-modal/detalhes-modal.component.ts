import { Component, OnInit} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-modal',
  templateUrl: './detalhes-modal.component.html',
  styleUrls: ['./detalhes-modal.component.scss'],
})
export class DetalhesModalComponent implements OnInit{

  public pokemon: any;

  constructor(
    private modalCrtl: ModalController,
    private params: NavParams
  ) { }

  ngOnInit() {
    this.pokemon = this.params.get('pokemon');
  }

  close(){
    this.modalCrtl.dismiss();
  }

 
}
