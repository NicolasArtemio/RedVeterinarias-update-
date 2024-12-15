import { CrudOperations } from "../interface/CrudOperations";
import { Provider } from "./Provider";
import { Veterinary } from "./Veterinary ";
import { question, questionInt } from "readline-sync";

export class RedVeterinaria implements CrudOperations<Object> {
    private veterinarias:Veterinary [] = [];
    private proveedores:Provider [] = [];

    constructor() {
        this.veterinarias = [];
        this.proveedores = []
    }


      public create():void {
        let name = question("Ingrese nombre: ");
        while (!name || !/^[a-zA-Z]+$/.test(name)) {
          name = question("Ingrese un nombre valido (solo letras a-z o A-Z): ");
        }

        let adress = question("Ingrese direccion: ");
        while (!name) {
          name = question("Ingrese una direccion: ");
        }

        let newVeterinary = new Veterinary(name,adress,[],[]);

        console.log(`La veterinaria ${newVeterinary.getName()} fue creada con exito!`);
        console.log(newVeterinary);
        
        this.veterinarias.push(newVeterinary);
       }

       public read(object: Object):void {}
    
       public update(object: Object):void {}
        
       public delete(object: Object):void {}

       public menu() {
        console.log("Gestionar veterinarias");
        console.log("");

        console.log("1. Crear Veterinaria");
        

        let option:number = questionInt("Selecione opcion: ");
        switch(option) {
            case 1:
                this.create();
            break;
        }
        
       }
    
}