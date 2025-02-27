interface Prototype_Example {
    clone(): Prototype_Example;
}

class Concrete_Prototype implements Prototype_Example {
    field1: string;

    constructor(prototype?: Concrete_Prototype) {
        if (prototype) {
            this.field1 = prototype.field1;
        } else {
            this.field1 = '';
        }
    }

    clone(): Prototype_Example {
        return new Concrete_Prototype(this);
    }
}

class SubClassPrototype extends Concrete_Prototype {
    field2: string;

    constructor(prototype?: SubClassPrototype) {
        super(prototype);
        if (prototype) {
            this.field2 = prototype.field2;
        } else {
            this.field2 = '';
        }
    }

    clone(): Prototype_Example {
        return new SubClassPrototype(this);
    }
}

// Función para comparar dos objetos
function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

// Ejemplo de uso
const original = new SubClassPrototype();
original.field1 = 'value1';
original.field2 = 'value2';

const clone = original.clone() as SubClassPrototype;
console.log('Valor del clone 1:',clone.field1); // Output: value1
console.log('Valor del clone 2:',clone.field2); // Output: value2

// Verificar si el clon es igual al original
console.log(deepEqual(original, clone)); // Output: true