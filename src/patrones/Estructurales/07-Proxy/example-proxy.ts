interface ServiceInterface{
    operation(): void;
}


class Service implements ServiceInterface{
    operation(): void {
        console.log('Servicio Real, hace una operacion')
    }
}

class Proxy_Example implements ServiceInterface{
    private realService: Service;

    constructor(realService: Service){
        this.realService = realService
    }
    checkAccess(access: boolean): boolean{
        return access;
    }
    operation(): void {
        if(this.checkAccess(true)){
            console.log('Operation en el proxy, llama al servicio real');
            this.realService.operation(); 
        }else{
            console.log('Operation en el proxy, en espera para llamar al servicio real');
        }
        
    }
}

function clientCode(service: ServiceInterface){
    service.operation();
}

const Proxy_Solicitud = new Proxy_Example(new Service());
clientCode(Proxy_Solicitud);