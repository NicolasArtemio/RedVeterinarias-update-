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

      //crud veterinaria
      public createVeterinay():void {
        let name:string = question("Ingrese nombre: ");
        while (!name || !/^[a-zA-Z]+$/.test(name)) {
          name = question("Ingrese un nombre valido (solo letras a-z o A-Z): ");
        }

        let adress:string = question("Ingrese direccion: ");
        while (!name) {
          name = question("Ingrese una direccion: ");
        }

        let newVeterinary:Veterinary = new Veterinary(name,adress,[],[]);

        console.log(`La veterinaria ${newVeterinary.getName()} fue creada con exito!`);
        console.log(newVeterinary);
        
        fs.appendFileSync('veterinarias.txt', `Veterinaria: ${newVeterinary.getName()}, Direccion: ${newVeterinary.getAdress()}, Clientes: ${newVeterinary.getClients()}, Proveedores: ${newVeterinary.getPatients()} \n`);

        this.veterinaries.push(newVeterinary);
        this.updateVeterinary;
      }

      public readListVeterinary():void {
        let data:string;
       
        try{
          data =  fs.readFileSync("veterinarias.txt", "utf-8");
          console.log(data);

          this.updateVeterinary;

        }catch (err){
            console.log("Error en lectura del archivo",err);
            this.updateVeterinary;
        }
      }

      public updateVeterinary(): void {
        let data: string;
    
        try {
            data = fs.readFileSync("veterinarias.txt", "utf-8");
            console.log("Lista de veterinarias:\n", data);
    
            // Convertir en un objeto 
            const lines = data.split("\n");
            this.veterinaries = lines.map(line => {
                // Quitar los espacios
                const parts = line.split(",").map(part => part.trim());
    
                // Extraemos y validamos los campos
                const [name, address, clientsStr, patientsStr] = parts;
                
                // Validamos si las cadenas de clientes y pacientes existen, y las procesamos
                const clients = clientsStr ? clientsStr.replace("Clientes: ", "").split(";") : [];
                const patients = patientsStr ? patientsStr.replace("Proveedores: ", "").split(";") : [];

                if (!name || !address) {
                    return null; 
                }
    
                return new Veterinary(
                    name.replace("Veterinaria: ", "").trim(),
                    address.replace("Direccion: ", "").trim(),
                    clients,
                    patients
                );
            }).filter(v => v !== null); 
    
            // Solicitar el nombre de la veterinaria a modificar
            let nameToUpdate = question("Ingrese el nombre de la veterinaria que desea modificar: ").trim();
            
            // Buscar la veterinaria a modificar
            let veterinaryToUpdate = this.veterinaries.find(v => v.getName().toLowerCase() === nameToUpdate.toLowerCase());
            console.log(veterinaryToUpdate);
    
            if (veterinaryToUpdate) {

                // Pedir nuevos valores si el usuario desea actualizarlos
                let newName = question(`Nuevo nombre para la veterinaria (deje vacío para mantener el actual "${veterinaryToUpdate.getName()}"): `).trim();
                let newAddress = question(`Nueva dirección para la veterinaria (deje vacío para mantener la actual "${veterinaryToUpdate.getAdress()}"): `).trim();
    
                if (newName) veterinaryToUpdate.setName(newName);
                if (newAddress) veterinaryToUpdate.setAdress(newAddress);
    
                // Generar el texto actualizado para el archivo
                let updatedData = this.veterinaries.map(v => {
                    // Asegurarse de que si no hay clientes o proveedores, se muestren como arreglos vacíos
                    const clients = v['clients'].length > 0 ? v['clients'].join(";") : "Ninguno";
                    const patients = v['patients'].length > 0 ? v['patients'].join(";") : "Ninguno";
    
                    return `Veterinaria: ${v.getName()}, Direccion: ${v.getAdress()}, Clientes: ${clients}, Proveedores: ${patients}`;
                }).join("\n");
    
                // Escribir el archivo actualizado
                fs.writeFileSync('veterinarias.txt', updatedData, 'utf-8');
                console.log("La veterinaria ha sido actualizada.");
            } else {
                console.log("Veterinaria no encontrada.");
            }
        } catch (err) {
            console.error("Error en lectura o escritura del archivo", err);
        }
    }

    public deleteVeterinary(): void {
      let data: string;
  
      try {

          data = fs.readFileSync("veterinarias.txt", "utf-8");
          console.log("Lista de veterinarias:\n", data);
  
          // Convertir en un objeto
          const lines = data.split("\n");
          this.veterinaries = lines.map(line => {
              const parts = line.split(",").map(part => part.trim());
              const [name, address, clientsStr, patientsStr] = parts;
  
              const clients: string [] = clientsStr ? clientsStr.replace("Clientes: ", "").split(";") : [];
              const patients: string [] = patientsStr ? patientsStr.replace("Proveedores: ", "").split(";") : [];
  
              if (!name || !address) {
                  return null;
              }
  
              return new Veterinary(
                  name.replace("Veterinaria: ", "").trim(),
                  address.replace("Direccion: ", "").trim(),
                  clients,
                  patients
              );
          }).filter(v => v !== null);
  
          // Nombre de la veterinaria a eliminar
          let nameToDelete:string = question("Ingrese el nombre de la veterinaria que desea eliminar: ").trim();
  
          // Buscar la veterinaria a eliminar
          let veterinaryToDeleteIndex:number = this.veterinaries.findIndex(v => v.getName().toLowerCase() === nameToDelete.toLowerCase());
  
          if (veterinaryToDeleteIndex !== -1) {
              // Eliminar la veterinaria de la lista
              this.veterinaries.splice(veterinaryToDeleteIndex, 1);
              console.log(`La veterinaria ha sido eliminada.`);
  
              // Generar el texto actualizado para el archivo
              let updatedData:string = this.veterinaries.map(v => {
                  const clients = v['clients'].length > 0 ? v['clients'].join(";") : "Ninguno";
                  const patients = v['patients'].length > 0 ? v['patients'].join(";") : "Ninguno";
  
                  return `Veterinaria: ${v.getName()}, Direccion: ${v.getAdress()}, Clientes: ${clients}, Proveedores: ${patients}`;
              }).join("\n");
  
              // Escribir el archivo actualizado
              fs.writeFileSync('veterinarias.txt', updatedData, 'utf-8');
              this.updateVeterinary;
          } else {
              console.log("Veterinaria no encontrada.");
              this.updateVeterinary;
          }
      } catch (err) {
          console.error("Error en lectura o escritura del archivo", err);
          this.updateVeterinary;
      }
  }

       public manageVeterinary() {
        console.log("Gestionar veterinarias");
        console.log("");

        console.log("1. Ver lista");
        console.log("2. Crear Veterinaria");
        console.log("3. Actualizar Veterinaria");
        console.log("4. Eliminar Veterinaria");
        

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
            case 4:
              this.deleteVeterinary();
            break;
            default:
              console.log("Opcion no valida");
              this.updateVeterinary;
            break;
        }    
       }
    
      //CRUD Proveedores
  
       public createVeterinay():void {
        let name:string = question("Ingrese nombre: ");
        while (!name || !/^[a-zA-Z]+$/.test(name)) {
          name = question("Ingrese un nombre valido (solo letras a-z o A-Z): ");
        }

        let adress:string = question("Ingrese direccion: ");
        while (!name) {
          name = question("Ingrese una direccion: ");
        }

        let newVeterinary:Veterinary = new Veterinary(name,adress,[],[]);

        console.log(`La veterinaria ${newVeterinary.getName()} fue creada con exito!`);
        console.log(newVeterinary);
        
        fs.appendFileSync('veterinarias.txt', `Veterinaria: ${newVeterinary.getName()}, Direccion: ${newVeterinary.getAdress()}, Clientes: ${newVeterinary.getClients()}, Proveedores: ${newVeterinary.getPatients()} \n`);

        this.veterinaries.push(newVeterinary);
        this.updateVeterinary;
      }

      public readListVeterinary():void {
        let data:string;
       
        try{
          data =  fs.readFileSync("veterinarias.txt", "utf-8");
          console.log(data);

          this.updateVeterinary;

        }catch (err){
            console.log("Error en lectura del archivo",err);
            this.updateVeterinary;
        }
      }

      public updateVeterinary(): void {
        let data: string;
    
        try {
            data = fs.readFileSync("veterinarias.txt", "utf-8");
            console.log("Lista de veterinarias:\n", data);
    
            // Convertir en un objeto 
            const lines = data.split("\n");
            this.veterinaries = lines.map(line => {
                // Quitar los espacios
                const parts = line.split(",").map(part => part.trim());
    
                // Extraemos y validamos los campos
                const [name, address, clientsStr, patientsStr] = parts;
                
                // Validamos si las cadenas de clientes y pacientes existen, y las procesamos
                const clients = clientsStr ? clientsStr.replace("Clientes: ", "").split(";") : [];
                const patients = patientsStr ? patientsStr.replace("Proveedores: ", "").split(";") : [];

                if (!name || !address) {
                    return null; 
                }
    
                return new Veterinary(
                    name.replace("Veterinaria: ", "").trim(),
                    address.replace("Direccion: ", "").trim(),
                    clients,
                    patients
                );
            }).filter(v => v !== null); 
    
            // Solicitar el nombre de la veterinaria a modificar
            let nameToUpdate = question("Ingrese el nombre de la veterinaria que desea modificar: ").trim();
            
            // Buscar la veterinaria a modificar
            let veterinaryToUpdate = this.veterinaries.find(v => v.getName().toLowerCase() === nameToUpdate.toLowerCase());
            console.log(veterinaryToUpdate);
    
            if (veterinaryToUpdate) {

                // Pedir nuevos valores si el usuario desea actualizarlos
                let newName = question(`Nuevo nombre para la veterinaria (deje vacío para mantener el actual "${veterinaryToUpdate.getName()}"): `).trim();
                let newAddress = question(`Nueva dirección para la veterinaria (deje vacío para mantener la actual "${veterinaryToUpdate.getAdress()}"): `).trim();
    
                if (newName) veterinaryToUpdate.setName(newName);
                if (newAddress) veterinaryToUpdate.setAdress(newAddress);
    
                // Generar el texto actualizado para el archivo
                let updatedData = this.veterinaries.map(v => {
                    // Asegurarse de que si no hay clientes o proveedores, se muestren como arreglos vacíos
                    const clients = v['clients'].length > 0 ? v['clients'].join(";") : "Ninguno";
                    const patients = v['patients'].length > 0 ? v['patients'].join(";") : "Ninguno";
    
                    return `Veterinaria: ${v.getName()}, Direccion: ${v.getAdress()}, Clientes: ${clients}, Proveedores: ${patients}`;
                }).join("\n");
    
                // Escribir el archivo actualizado
                fs.writeFileSync('veterinarias.txt', updatedData, 'utf-8');
                console.log("La veterinaria ha sido actualizada.");
            } else {
                console.log("Veterinaria no encontrada.");
            }
        } catch (err) {
            console.error("Error en lectura o escritura del archivo", err);
        }
    }

    public deleteVeterinary(): void {
      let data: string;
  
      try {

          data = fs.readFileSync("veterinarias.txt", "utf-8");
          console.log("Lista de veterinarias:\n", data);
  
          // Convertir en un objeto
          const lines = data.split("\n");
          this.veterinaries = lines.map(line => {
              const parts = line.split(",").map(part => part.trim());
              const [name, address, clientsStr, patientsStr] = parts;
  
              const clients: string [] = clientsStr ? clientsStr.replace("Clientes: ", "").split(";") : [];
              const patients: string [] = patientsStr ? patientsStr.replace("Proveedores: ", "").split(";") : [];
  
              if (!name || !address) {
                  return null;
              }
  
              return new Veterinary(
                  name.replace("Veterinaria: ", "").trim(),
                  address.replace("Direccion: ", "").trim(),
                  clients,
                  patients
              );
          }).filter(v => v !== null);
  
          // Nombre de la veterinaria a eliminar
          let nameToDelete:string = question("Ingrese el nombre de la veterinaria que desea eliminar: ").trim();
  
          // Buscar la veterinaria a eliminar
          let veterinaryToDeleteIndex:number = this.veterinaries.findIndex(v => v.getName().toLowerCase() === nameToDelete.toLowerCase());
  
          if (veterinaryToDeleteIndex !== -1) {
              // Eliminar la veterinaria de la lista
              this.veterinaries.splice(veterinaryToDeleteIndex, 1);
              console.log(`La veterinaria ha sido eliminada.`);
  
              // Generar el texto actualizado para el archivo
              let updatedData:string = this.veterinaries.map(v => {
                  const clients = v['clients'].length > 0 ? v['clients'].join(";") : "Ninguno";
                  const patients = v['patients'].length > 0 ? v['patients'].join(";") : "Ninguno";
  
                  return `Veterinaria: ${v.getName()}, Direccion: ${v.getAdress()}, Clientes: ${clients}, Proveedores: ${patients}`;
              }).join("\n");
  
              // Escribir el archivo actualizado
              fs.writeFileSync('veterinarias.txt', updatedData, 'utf-8');
              this.updateVeterinary;
          } else {
              console.log("Veterinaria no encontrada.");
              this.updateVeterinary;
          }
      } catch (err) {
          console.error("Error en lectura o escritura del archivo", err);
          this.updateVeterinary;
      }
  }


      public menuProviders() {
        console.log("Gestionar veterinarias");
        console.log("");

        console.log("1. Ver lista");
        console.log("2. Crear Veterinaria");
        console.log("3. Actualizar Veterinaria");
        console.log("4. Eliminar Veterinaria");
        

        let option:number = questionInt("Selecione opcion: ");
        switch(option) {
            case 1:
                "this.readListProvider()";
            break;
            case 2:
              "this.createProvider()";
            break;
            case 3:
              "this.updateProvider()";
            break;
            case 4:
              "this.deleteProvider()";
            break;
            default:
              console.log("Opcion no valida");
              "this.updateProvider()";
            break;
        }
        
       }
    

}
