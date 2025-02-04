interface Product{
    doStuff():string;
  }
  
  /////////////////////////////
  class ConcreteProductA implements Product{
    doStuff():string {
      return 'hago algo en A';
    }
  }
  
  class ConcreteProductB implements Product{
    doStuff():string {
     return 'hago algo en B';
    }
  }
  
  ////////////////////
  
  abstract class Creator{
    someOperation(){
      const product = this.factoryMethod();
      // Now, use the product.
      return `Creator: The same creator's code has just worked with ${product.doStuff()}`;
    }
    abstract factoryMethod(): Product;
  }
  
  class ConcreteCreatorA extends Creator{
    factoryMethod(): Product{
      return new ConcreteProductA();
    }
  }
  
  class ConcreteCreatorB extends Creator{
    factoryMethod(): Product{
      return new ConcreteProductB();
    }
  }
  
  function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation()); // call someOperation()
    // ...
  }
  
  /**
  * The Application picks a creator's type depending on the configuration or
  * environment.
  */
  console.log('App: Launched with the ConcreteCreatorA.');
  clientCode(new ConcreteCreatorA());
  console.log('');
  
  console.log('App: Launched with the ConcreteCreatorB.');
  clientCode(new ConcreteCreatorB());