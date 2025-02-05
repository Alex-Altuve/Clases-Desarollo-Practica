interface Builder{
    reset():void;
    buildStepA():void;
    buildStepB():void;
    buildStepZ():void;
}

class Product1{
    parts:string[] = [];

    public addPart(part: string): void {
        this.parts.push(part);
    }

    listParts():void{
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

class Product2{
    parts:string[] = [];

    public addPart(part: string): void {
        this.parts.push(part);
    }

    listParts():void{
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

class ConcreteBuilder1 implements Builder{
    private result: Product1;
    
    constructor( ){ this.result = new Product1();}

    reset():void{
        this.result = new Product1();
    }
    buildStepA():void{
        this.result.addPart('PartA1');
    }
    buildStepB():void{
        this.result.addPart('PartB1');
    }
    buildStepZ():void{
        this.result.addPart('PartZ1');
    }

    getResult():Product1{
        const result = this.result;
        this.reset();
        return result;
    }
}


class ConcreteBuilder2 implements Builder{
    private result: Product2 ;

    constructor( ){  this.result = new Product2();;}

    reset():void{
        this.result = new Product2();
    }
    buildStepA():void{
        this.result.addPart('PartA2');
    }
    buildStepB():void{
        this.result.addPart('PartB2');
    }
    buildStepZ():void{
        this.result.addPart('PartZ2');
    }

    getResult():Product1{
        const result = this.result;
        this.reset();
        return result;
    }
}

class Director{
    private builder: Builder;
    
    constructor(){ this.builder = new ConcreteBuilder1();}

    changeBuilder(builder: Builder):void{
        this.builder = builder;
    }
    makeSimple():void{
        this.builder.buildStepA()
    }
    makeFull():void{
        this.builder.buildStepB()
        this.builder.buildStepZ()
    }
}

function Client(director: Director){
    const builder = new ConcreteBuilder2();
    director.changeBuilder(builder);

    console.log('Standard basic product');
    director.makeSimple();
    builder.getResult().listParts();
    
    console.log('Standard full featured product:');
    director.makeFull();
    builder.getResult().listParts();
      
}


Client(new Director());