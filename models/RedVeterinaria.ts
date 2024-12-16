import { Provider } from "./Provider";
import { Veterinary } from "./Veterinary ";
import { question, questionInt } from "readline-sync";
import * as fs from 'fs';

export class RedVeterinaria {
    private veterinaries:Veterinary [] = [];
    private providers:Provider [] = [];

    constructor() {
        this.veterinaries = [];
        this.providers = []
    }


      public createVeterinay():void {
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
        
        fs.appendFileSync('veterinarias.txt', `Veterinaria: ${newVeterinary.getName()}, Direccion: ${newVeterinary.getAdress()}, Clientes: ${newVeterinary.getClients()}, Proveedores: ${newVeterinary.getPatients()} \n`);

        this.veterinaries.push(newVeterinary);
      }

      public readListVeterinary():void {
        let data:string;
       
        try{
          data =  fs.readFileSync("veterinarias.txt", "utf-8");
          console.log(data);

        }catch (err){
            console.error("Error en lectura del archivo",err);
        }
      }

      public updateVeterinary():void {
        let data: string;

        try {
            data = fs.readFileSync("veterinarias.txt", "utf-8");
            console.log("Lista de veterinarias:\n", data);

            let nameToUpdate = question("Ingrese el nombre de la veterinaria que desea modificar: ");
            
            let veterinaryToUpdate = this.veterinaries.find(v => v.getName() === nameToUpdate);

            if (veterinaryToUpdate) {
                let newName = question(`Nuevo nombre para la veterinaria (deje vacío para mantener el actual "${veterinaryToUpdate.getName()}"): `);
                let newAddress = question(`Nueva direccion para la veterinaria (deje vacío para mantener la actual "${veterinaryToUpdate.getAdress()}"): `);

                if (newName) veterinaryToUpdate.setName(newName)
                if (newAddress) veterinaryToUpdate.setAdress(newAddress)

                let updatedData = this.veterinaries.map(v => 
                    `Veterinaria: ${v.getName()}, Direccion: ${v.getAdress()}, Clientes: ${v.getClients()}, Proveedores: ${v.getPatients()}`).join("\n");
                fs.writeFileSync('veterinarias.txt', updatedData, 'utf-8');
                console.log("La veterinaria ha sido actualizada.");
            } else {
                console.log("Veterinaria no encontrada.");
            }
        } catch (err) {
            console.error("Error en lectura o escritura del archivo", err);
        }
      }

       public menu() {
        console.log("Gestionar veterinarias");
        console.log("");

        console.log("1. Ver lista");
        console.log("2. Crear Veterinaria");
        console.log("3. Actualizar Veterinaria");
        

        let option:number = questionInt("Selecione opcion: ");
        switch(option) {
            case 1:
                this.readListVeterinary();
            break;
            case 2:
              this.createVeterinay();
            break;
            case 3:
              this.updateVeterinary();
            break;
            default:
              console.log("Opcion no valida")
              this.menu();
            break;
        }
        
       }
    
}