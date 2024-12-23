export class Provider {
  private id: number = Math.floor(Math.random() * 10000);
  private name: string;
  private phone: string;

  constructor(name: string, phone: string) {
    this.id = Math.floor(Math.random() * 10000);
    this.name = name;
    this.phone = phone;
  }

  public getIdProvider():number{
  return this.id;
  }

  public setName(name: string):void {
    this.name = name;
  }

  public getName():string {
    return this.name;
  }

  public setPhone(phone: string):void {
    this.phone = phone;
  }

  public getPhone():string {
    return this.phone;
  }
}
 

