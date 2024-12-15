import { Client, Patient, Provider, Veterinary } from "../models";



type Object = Veterinary  | Provider | Client | Patient ;

export interface CrudOperations<T extends Object > {
    create: (object: T) => void;
    read: (object: T) => void;
    update: (object: T) => void;
    delete: (id: number) => void;
}
