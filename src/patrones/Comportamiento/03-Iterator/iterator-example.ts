interface IterableCollection{
    createIterator(): IIterator;
}

interface IIterator{
    getNext(): any;
    hasNext(): boolean;
}

class ConcreteCollection implements IterableCollection{
    private items: number[] = [];

    public addItem(item: number): void{
        this.items.push(item);
    }

    public createIterator(): IIterator{
        return new ConcreteIterator(this);
    }

    public createReverseIterator(): IIterator{
        return new ConcreteIterator(this, true);
    }

    public getItems(): number[]{
        return this.items;
    }

    public getLength():number{
        return this.items.length;
    }
    public getReverse(): number[]{
        return this.items.reverse();
    }
}


class ConcreteIterator implements IIterator{
    private collection: ConcreteCollection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection: ConcreteCollection, reverse: boolean = false){
        this.collection = collection;
        this.reverse = reverse;
        if(reverse){
            this.position = collection.getLength() - 1;
        }
    }

    public getNext(): any{
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public hasNext(): boolean{
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getLength();
    }
}


function clientCode_iterator(collection: ConcreteCollection): void{
    let iterator = collection.createIterator();
    const iteratorReverse = collection.createReverseIterator();
    
    console.log("Straight traversal: ");
    while(iterator.hasNext()){
        console.log(iterator.getNext());
    }
    console.log();
    console.log("Reversal traversal: ");
    while(iteratorReverse.hasNext()){
        console.log(iteratorReverse.getNext());
    }
}
let collection = new ConcreteCollection();
collection.addItem(1);
collection.addItem(2);
collection.addItem(3);
collection.addItem(4);

clientCode_iterator(collection); // 1, 2, 3, 4