/**
 * La interfaz base Componente define operaciones que pueden ser alteradas por
 * los decoradores.
 */
interface Componente {
    operacion(): string;
}

/**
 * Los Componentes Concretos proporcionan implementaciones predeterminadas de las operaciones.
 * Puede haber varias variaciones de estas clases.
 */
class ComponenteConcreto implements Componente {
    public operacion(): string {
        return 'ConcreteComponent';
    }
}

/**
 * La clase base Decorador sigue la misma interfaz que los otros componentes.
 * El propósito principal de esta clase es definir la interfaz de envoltura para todos
 * los decoradores concretos. La implementación predeterminada del código de envoltura podría
 * incluir un campo para almacenar un componente envuelto y los medios para inicializarlo.
 */
class Decorador implements Componente {
    protected componente: Componente;

    constructor(componente: Componente) {
        this.componente = componente;
    }

    /**
     * El Decorador delega todo el trabajo al componente envuelto.
     */
    public operacion(): string {
        return this.componente.operacion();
    }
}

/**
 * Los Decoradores Concretos llaman al objeto envuelto y alteran su resultado de alguna manera.
 */
class DecoradorConcretoA extends Decorador {
    /**
     * Los decoradores pueden llamar a la implementación del padre de la operación, en lugar de
     * llamar directamente al objeto envuelto. Este enfoque simplifica la extensión
     * de las clases de decoradores.
     */
    public operacion(): string {
        return `ConcreteDecoratorA(${super.operacion()})`;;
    }
}

/**
 * Los decoradores pueden ejecutar su comportamiento antes o después de la llamada a un
 * objeto envuelto.
 */
class DecoradorConcretoB extends Decorador {
    public operacion(): string {
        return `ConcreteDecoratorB(${super.operacion()})`;
    }
}

/**
 * El código del cliente trabaja con todos los objetos usando la interfaz Componente. De esta
 * manera puede mantenerse independiente de las clases concretas de componentes con las que trabaja.
 */
function codigoCliente(componente: Componente) {
    // ...

    console.log(`RESULT: ${componente.operacion()}`);

    // ...
}

/**
 * De esta manera, el código del cliente puede soportar tanto componentes simples...
 */
const componenteSimple = new ComponenteConcreto();
console.log('Client: I\'ve got a simple component:');
codigoCliente(componenteSimple);
console.log('');

/**
 * ...así como los decorados.
 *
 * Nota cómo los decoradores pueden envolver no solo componentes simples sino también otros
 * decoradores.
 */
const decoradorA = new DecoradorConcretoA(componenteSimple);
const decoradorB = new DecoradorConcretoB(decoradorA);
console.log('Client: Now I\'ve got a decorated component:');
codigoCliente(decoradorB);
codigoCliente(decoradorA);