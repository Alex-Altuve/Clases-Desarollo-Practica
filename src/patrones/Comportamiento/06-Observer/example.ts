interface Subscriber {
     update(context: string): void;
}


class ConcreteSubscriberA implements Subscriber {
    public update(context: string): void {
        console.log(`ConcreteSubscriberA: ${context}, He recibido el mensaje`);
    }
}

class ConcreteSubscriberB implements Subscriber {
    public update(context: string): void {
        console.log(`ConcreteSubscriberB: ${context}, He recibido el mensaje`);
    }
}

class Publisher{
    private subscribers: Subscriber[] = [];
    private mainState: string = '';
    
    public subscribe (s: Subscriber): void {
        this.subscribers.push(s);
    }

    public unsubscribe (s: Subscriber): void {
        const index = this.subscribers.indexOf(s);
        this.subscribers.splice(index, 1);
    }
    public notify(): void {
        for (const subscriber of this.subscribers) {
            subscriber.update(this.mainState);
        }
    }

    public mainBusinessLogic(): void {
        this.mainState = 'mainState';
        console.log(`Publisher: I'm doing something important`);
        this.notify();
    }
}


const sub_1= new ConcreteSubscriberA();
const sub_2= new ConcreteSubscriberB();

const publisher = new Publisher();
publisher.subscribe(sub_1);
publisher.subscribe(sub_2);

publisher.mainBusinessLogic();
