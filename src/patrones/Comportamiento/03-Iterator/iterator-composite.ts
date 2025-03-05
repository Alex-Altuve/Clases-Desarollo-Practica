interface Componente_v2{
    sumarPrecio(): number;
    print(indent: string): void;
}

class Producto_Hoja_v2 implements Componente_v2{
    constructor(public name: string, public price: number) {}

    sumarPrecio(): number {
        return this.price;
    }

    print(indent: string): void {
        console.log(`${indent}${this.name}: $${this.price}`);
    }
}

class Caja_Composite_v2 implements Componente_v2{
    private children: Componente_v2[] = [];
  
    constructor(public name: string) {}

    add(child: Componente_v2): void {
        this.children.push(child);
    }

    remove(child: Componente_v2): void {
        const index = this.children.indexOf(child);
        this.children.splice(index, 1);
    }

    getChildren(): Componente_v2[] {
        return this.children;
    }

    sumarPrecio(): number {
        return this.children.reduce((a, b) => a + b.sumarPrecio(), 0);
    }

    print(indent: string): void {
        console.log(`${indent}${this.name}`);
        for (const child of this.children) {
            child.print(indent + '  ');
        }
    }
}

interface iterador<T>{
    getNext(): T | null;
    hasMore(): boolean;
}

class IteradorConcreto implements iterador<Componente_v2>{
    private stack: Componente_v2[] = []

    constructor(private root: Componente_v2) {
        this.stack.push(root);
    }

    getNext(): Componente_v2 | null {
        if (this.hasMore()) {
            const current = this.stack.pop()!;
            if (current instanceof Caja_Composite_v2) {
                for (const child of current.getChildren()) {
                    this.stack.push(child);
                }
            }
            return current;
        }
        return null;
    }
    hasMore(): boolean {
       return this.stack.length > 0;
    }
}


/// main

const product1_v2 = new Producto_Hoja_v2('Zapatos Nike', 50);
const product2_v2 = new Producto_Hoja_v2('Camisa Polo', 30);
const product3_v2 = new Producto_Hoja_v2('Pantalon Zara', 40);

const box_ropa_v2 = new Caja_Composite_v2('Caja de Ropa');
box_ropa_v2.add(product2_v2);
box_ropa_v2.add(product3_v2);

const box_zapatos_v2 = new Caja_Composite_v2('Caja de Zapatos');
box_zapatos_v2.add(product1_v2);

const pedido_v2 = new Caja_Composite_v2('Pedido');
pedido_v2.add(box_ropa_v2);
pedido_v2.add(box_zapatos_v2);

console.log('Mostrar precio total del pedido');
console.log(`${+pedido_v2.sumarPrecio()}$`); // Devuelve 120
console.log('');
console.log('Mostrar arbol de productos');
pedido_v2.print(''); // Dibuja la estructura del árbol por consola

console.log('')
console.log('')
// Usar el iterador para recorrer la estructura
const iterator_v = new IteradorConcreto(pedido_v2);

console.log('Recorrer la estructura con el iterador:');
while (iterator_v.hasMore()) {
    const component = iterator_v.getNext();
    component?.print('');
}