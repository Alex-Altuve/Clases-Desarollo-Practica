interface Handler_Example{
    setNext(h: Handler_Example): Handler_Example;
    handle(request: string): string | null;
}


class BaseHandler_Example implements Handler_Example{
    private nextManejador !: Handler_Example;

    setNext(handler: Handler_Example): Handler_Example {
       this.nextManejador = handler;
       return handler;
    }
    handle(request: string): string | null {
        if(this.nextManejador){
            return this.nextManejador.handle(request);
        }
        return null;
    }

}

/// ** Clase concretas o manejadores concretos

class Comprobacion_autorizacion extends BaseHandler_Example{
    
    handle(request: string): string | null {
        if(request === 'Autorizacion'){
            return `Autorizacion: Se ha autorizado la operacion ${request}`;
        }
        return super.handle(request);
    }
}

class Comprobacion_autenticacion extends BaseHandler_Example{
    handle(request: string): string | null {
        if(request === 'Autenticacion'){
            return `Autenticación: Se ha autenticado la operacion ${request}`;
        }
        return super.handle(request);
    }
}

class Comprobacion_validacion extends BaseHandler_Example{
    handle(request: string): string | null {
        if(request === 'Validación'){
            return `Validación: Se ha validación la operacion ${request}`;
        }
        return super.handle(request);
    }
}

class Almacenamiento_cache extends BaseHandler_Example{
    handle(request: string): string | null {
        if(request === 'Caché'){
            return `Caché: Se ha almacenado en caché la operacion ${request}`;
        }
        return super.handle(request);
    }
}

function clientCode_Comprobaciones(handler: Handler_Example) {
    const operations = ['Autorizacion', 'Autenticacion', 'Validación', 'Caché', 'Comprobacion IP'];

    operations.forEach((operation) => {
        console.log(`Client: ¿Quién quiere ${operation}?`);
        const result = handler.handle(operation);
        if (result) {
            console.log(`   ${result}`);
        } else {
            console.log(`   ${operation} no se ha completado`);
        }
    });
}

/// ejemplo de uso

const autorizacion = new Comprobacion_autorizacion();
const autenticacion = new Comprobacion_autenticacion();
const validacion = new Comprobacion_validacion();
const cache_var = new Almacenamiento_cache();

autorizacion.setNext(autenticacion).setNext(validacion).setNext(cache_var);

console.log('Chain: autorizacion  > autenticacion> validacion > almacenamieno cache\n');
clientCode_Comprobaciones(autorizacion);
console.log('');

