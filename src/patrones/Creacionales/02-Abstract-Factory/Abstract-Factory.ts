interface  AbstractProductB{
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}
  
  class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
  }
  
  class ConcreteProductB2 implements AbstractProductB { 
    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B2 collaborating with the (${result})`;
    }
  }
  
  
  interface AbstractProductA{
    usefulFunctionA(): string;
  
  }
  
  class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A1.';
    }
   
  }
  
  class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A2.';
    }
  }
  
  interface AbstractFactory{
    createProductA(): AbstractProductA
    createProductB(): AbstractProductB
  }
  
  class ConcreteFactory1 implements AbstractFactory{
    createProductA(): AbstractProductA{
      return new ConcreteProductA1();
    }
    createProductB(): AbstractProductB{
      return new ConcreteProductB1();
    }
  }
  
  class ConcreteFactory2 implements AbstractFactory{
    createProductA(): AbstractProductA{
      return new ConcreteProductA2();
    }
    createProductB(): AbstractProductB{
      return new ConcreteProductB2();
    }
  }
  
  
  function client(factory: AbstractFactory) {
      const productA = factory.createProductA();
      const productB = factory.createProductB();
  
      console.log(productB.usefulFunctionB());
      console.log(productB.anotherUsefulFunctionB(productA));
      console.log(productA.usefulFunctionA());
  }
  
  console.log('Client: Testing client code with the first factory type...');
  client(new ConcreteFactory1());
  
  console.log('');
  
  console.log('Client: Testing the same client code with the second factory type...');
  client(new ConcreteFactory2());