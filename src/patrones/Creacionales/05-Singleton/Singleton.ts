class Singleton{
    private nombre: string;
    private static instance: Singleton;

    private constructor(nombre: string){
        this.nombre = nombre;
    }

    static getInstance(type: string): Singleton{
        if(!this.instance){
            this.instance = new Singleton(type);
        }
        return this.instance
    }
    
}

const instancia1 = Singleton.getInstance("Instancia Unica 1");
console.log(instancia1);


/// si tratas de crear una nueva instancia te devolvera la misma otra vez, no crea una instancia nueva
const instancia2 = Singleton.getInstance("Instancia Unica 2");
console.log(instancia2);