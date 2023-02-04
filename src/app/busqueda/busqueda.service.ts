import { Injectable } from "@angular/core";
import { Busqueda } from "./busqueda.model";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Subject } from "rxjs";
import { environment } from '../../environments/environment.development';

// const apiKey = environment.apiKey;
// let headers = new HttpHeaders();
// headers = headers.set('X-Api-Key', apiKey);

@Injectable({providedIn: 'root'})
export class BusquedaService {
  apiKey:string = environment.apiKey;
  headers = new HttpHeaders();
  header = this.headers.set('X-Api-Key', this.apiKey);

  constructor(private http:HttpClient) {}
  private busqueda: Busqueda[] = [];
  private busquedaResults = new Subject<Busqueda[]>();
  //https://api-ninjas.com/api/dogs
  getDogsEasyToTrain(){
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/dogs?trainability=5", {headers: this.header})
      .subscribe((result)=>{
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      });
  }
  getDogsHighEnergy(){
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/dogs?energy=5", {headers: this.header})
      .subscribe((result)=>{
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      });
  }

  getDogsProtective(){
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/dogs?protectiveness=5", {headers: this.header})
      .subscribe((result)=>{
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      });
  }

  getDogsLessFur(){
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/dogs?shedding=0", {headers: this.header})
      .subscribe((result)=>{
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      });
  }

  getBusquedaObservable(){
    return this.busquedaResults.asObservable();
  }
}
