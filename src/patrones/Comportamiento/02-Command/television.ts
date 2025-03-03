interface Commando{
    execute(): void;
}

// Clase Receiver
// Relamente ellos hace el trabajo
class Television{
    powerOn(): void{
        console.log('Encendiendo la televisión');
    }

    powerOff(): void{
        console.log('Apagando la televisión');
    }
}

// Clase ConcreteCommand ellos mandan esa solicitud al receiver
// y el receiver hace el trabajo
class EncenderTelevision implements Commando{
    private television: Television;

    constructor(television: Television){
        this.television = television;
    }

    execute(): void{
        this.television.powerOn();
    }
}

class ApagarTelevision implements Commando{
    private television: Television;

    constructor(television: Television){
        this.television = television;
    }

    execute(): void{
        this.television.powerOff();
    }
}

// Clase Invoker
// responsable de recibir las solicitudes
class ControlRemoto{
    private commando!: Commando;

    public setCommando(commando: Commando): void{
        this.commando = commando;
    }

    public pressButton(): void{
        this.commando.execute();
    }
}

//Reciever - Receptor
const T_V = new Television();

//ConcreteCommand - Comando (solicitudes - acciones)
const encender = new EncenderTelevision(T_V);
const apagar = new ApagarTelevision(T_V);

//Invoker - Invocador (escucha las solicitudes)
const control_remote = new ControlRemoto();

control_remote.setCommando(encender);
control_remote.pressButton();

control_remote.setCommando(apagar);
control_remote.pressButton();
