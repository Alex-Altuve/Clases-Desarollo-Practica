class Context{
    private state!: State;

    constructor(state: State){
        this.state = state;
    }

    public Context(state: State){
        this.state = state;
    }

    public changeState(state: State){
        console.log("Con")
        console.log('' + this.state + ' -> ' + state);
        this.state = state;
    }

    public doThis():void{
        this.state.doThis();
    }

    public doThat():void{
        this.state.doThat();
    }
}

interface State{
    doThis(): void;
    doThat(): void;
}

class ConcreteStateA implements State{
    doThis(): void {
        console.log("ConcreteStateA.doThis()");
    }
    doThat(): void {
       console.log("ConcreteStateA.doThat()");
    }

}

class ConcreteStateB implements State{
    doThis(): void {
        console.log("ConcreteStateB.doThis()");
    }
    doThat(): void {
       console.log("ConcreteStateB.doThat()");
    }


}

const initialState = new ConcreteStateA();
const context = new Context(initialState);

context.doThis();
