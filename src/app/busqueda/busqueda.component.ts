import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Busqueda } from './busqueda.model';
import { BusquedaService } from './busqueda.service';
interface BusRes {
  perros: Busqueda[];
  criteria: string;
}
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnDestroy{
  criteria: string ='';
  criteriaSelected: BusRes = {perros: [],criteria: ''};
  private subResponse: Subscription;
  constructor(public busquedaService: BusquedaService){
    this.subResponse = Subscription.EMPTY;
  }

  onCriteriaSelectedFromChild(criteria: number){
    // this.criteriaSelected = criteria;
    switch (criteria) {
      case 0:
        this.criteria='';
        this.criteriaSelected = {perros: [],criteria: this.criteria};
        break;
      case 1:
        this.criteria='Para Alergias';
        this.busquedaService.getDogsLessFur();
        break;
      case 2:
        this.criteria='Sumamente Energeticos';
        this.busquedaService.getDogsHighEnergy();
        break;
      case 3:
        this.criteria='Los más Protectores';
        this.busquedaService.getDogsProtective();
        break;
      case 4:
        this.criteria='Faciles de Entrenar';
        this.busquedaService.getDogsEasyToTrain();
        break;
      default:
        break;
    }
    this.subResponse = this.busquedaService.getBusquedaObservable().subscribe((r: Busqueda[])=>{
      console.log('buscando');
      this.criteriaSelected = {perros: r, criteria: this.criteria};
    })
  }

  ngOnDestroy(): void {
    console.log('Dejando Componente')
    this.subResponse.unsubscribe();
  }
}
