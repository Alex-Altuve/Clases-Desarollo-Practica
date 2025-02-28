class Abstraccion{
    protected implementacion!: Implemetacion;

    constructor(implementacion: Implemetacion){
        this.implementacion = implementacion;
    }
   
    public operation(): string {
        return `Abstraction: Base operation with:\n${this.implementacion.operationImplementation()}`;
   }
}

interface Implemetacion{
    operationImplementation(): string;
}



class ImplementacionConcreta1 implements Implemetacion{
    operationImplementation(): string {
        return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    }

}

class ImplementacionConcreta2 implements Implemetacion{
    operationImplementation(): string {
       return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    }

}


const imp1= new ImplementacionConcreta1();
const imp2= new ImplementacionConcreta2();

const abstraccion1 = new Abstraccion(imp1);
const abstraccion2 = new Abstraccion(imp2);

console.log(abstraccion1.operation());
console.log(abstraccion2.operation());