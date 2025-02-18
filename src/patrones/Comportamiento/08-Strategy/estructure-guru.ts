class Context_Strategy{
    private strategy!: Strategy

    constructor(strategy: Strategy){
        this.strategy = strategy;
    }
    public setStrategy(strategy: Strategy): void{
        this.strategy = strategy;
    }
    public doSomtheing(data: string[]): string[]{
        return this.strategy.execute(data);
    }
}

interface Strategy{
    execute(data: string[]): string[];
}


class ConcreteStrategyA implements Strategy{
    execute(data: string[]): string[]{
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy{
    execute(data: string[]): string[]{
        return data.reverse();
    }
}



const contexto = new Context_Strategy(new ConcreteStrategyA);
console.log(contexto.doSomtheing(["a", "b", "c", "d"]));


const otro_algoritmo = new ConcreteStrategyB;
contexto.setStrategy(otro_algoritmo);
console.log(contexto.doSomtheing(["a", "b", "c", "d"]));