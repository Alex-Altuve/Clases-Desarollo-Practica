interface Memento_V2{
    getState(): string;
    getDate():string;
}

// Guarda el estado en un momento dado y te da accesp a e;
class ConcreteMemento_V2 implements Memento_V2{
    private state: string;
    private date: string;
    
    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    

    public getState(): string {
        return this.state;
    }
    
    public getDate(): string {
        return this.date;
    }
    
    
}

// Se encarga del control de los mementos, la recuperacion y el almacenamiento
class Cuidadora{
    private origin!: Originador;
    private history : Memento_V2[] = [];

    constructor(origin: Originador){
        this.origin= origin;
    }

    public almacenar_memento(){
        console.log('\nCuidador: Guardando estado del originador');
        this.history.push(this.origin.save())
    }

    public undo(){
        console.log('\nCuidador: Guardando estado del originador');
        if (!this.history.length) {
            return;
        }
        const memento = this.history.pop();
        if (memento) {
            console.log(`Cuidador: Restaurando estado a : ${memento.getState()}`);
            this.origin.restore(memento)
        }
    }

}

class Originador{
    private state!: string;

    constructor(state: string){
        this.state=state;
        console.log(`Originador: estado inicial ${state}`);
    }

    public cambio_estado(){
        this.state= this.state.split('').reverse().join('');
        console.log(`Originador: mi estado cambio a ${this.state}`);
    }

    
    public save(): Memento_V2{
        return new ConcreteMemento_V2(this.state);
    }

    public restore(m: Memento_V2){
        this.state = m.getState();
        console.log(`Originador: Mi estado cambio a: ${this.state}`);
    }
}

/// 1
const origina = new Originador('Alex Mateo, Futbol');

const cuidador = new Cuidadora(origina);

cuidador.almacenar_memento();

origina.cambio_estado()
cuidador.almacenar_memento();

cuidador.undo()
cuidador.undo()
