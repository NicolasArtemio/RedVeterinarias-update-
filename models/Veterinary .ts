import { CrudOperations } from "../interface/CrudOperations";
import { Client } from "./Client";
import { Patient } from "./Patient ";
import { question, questionInt } from "readline-sync";



export class Veterinary implements CrudOperations<Object> {
    private idVeterinary: number;
    private name: string;
    private adress: string;
    private clients: Client[];
    private patients: Patient[];

    constructor(name: string, adress: string, clients: Client[], patients: Patient[]) {
        this.idVeterinary = Math.floor(Math.random() * 100000);
        this.name = name;
        this.adress = adress;
        this.clients = clients;
        this.patients = patients;
    }

   public getidVeterinary():number {
    return this.idVeterinary;
   }

   public getName():string {
    return this.name;
   }
   public setName(name:string):void {
     this.name = name;
   }

   public getAdress():string {
    return this.adress;
   }
   public setAdress(adress:string) {
    this.adress = adress;
   }

   public getClients():Client[] {
    return this.clients;
   }

   public getPatients():Patient[] {
    return this.patients;
   }

   public create():void {
    let name = question("Ingrese nombre: ");
    while (!name || !/^[a-zA-Z]+$/.test(name)) {
      name = question("Ingrese un nombre válido (solo letras a-z o A-Z): ");
    }
   }

   public read(object: Object):void {}

   public update(object: Object):void {}
    
   public delete(object: Object):void {}


}