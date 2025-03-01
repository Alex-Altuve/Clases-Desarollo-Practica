class FlyweightFactory_V1 {
    private cache: { [key: string]: Flyweight_V1 } = {};

    getFlyweight(repeatingState: string): Flyweight_V1 {
        if (!this.cache[repeatingState]) {
            this.cache[repeatingState] = new Flyweight_V1(repeatingState);
        }
        return this.cache[repeatingState];
    }

    listFlyweights(): void {
        const count = Object.keys(this.cache).length;
        console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        for (const key in this.cache) {
            console.log(`Key: ${key}, Flyweight: ${JSON.stringify(this.cache[key])}`);
        }
    }
}

class Flyweight_V1 {
    constructor(private repeatingState: string) {}

    operation(uniqueState: string): void {
        console.log(`Flyweight: Displaying shared (${this.repeatingState}) and unique (${uniqueState}) state.`);
    }
}

class Context_V {
    private uniqueState: string;
    private flyweight: Flyweight_V1;
    private factory: FlyweightFactory_V1;
    private repeatingState: string;

    constructor(flyweight: Flyweight_V1, uniqueState: string, repeatingState: string, factory: FlyweightFactory_V1) {
        this.flyweight = factory.getFlyweight(repeatingState);
        this.uniqueState = uniqueState;
        this.factory = factory;
        this.repeatingState = repeatingState;
    }

    operation(): void {
        this.flyweight.operation(this.uniqueState);
    }
}

// Ejemplo de uso
const fabrica = new FlyweightFactory_V1();

const flyweight1 = fabrica.getFlyweight('Estado Repetido 1');
const flyweight2 = fabrica.getFlyweight('Estado Repetido 2');

const context1 = new Context_V(flyweight1, 'Estado Único 1', 'Estado Repetido 1', fabrica);
const context2 = new Context_V(flyweight2, 'Estado Único 2', 'Estado Repetido 2', fabrica);
const context3 = new Context_V(flyweight2, 'Estado Único 3', 'Estado Repetido 2', fabrica);

context1.operation();
context2.operation();
context3.operation();


fabrica.listFlyweights(); 