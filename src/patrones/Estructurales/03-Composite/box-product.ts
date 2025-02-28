interface componente{
    sumarPrecio(): number;
    print(indent: string): void;
}

class Producto_Hoja implements componente {
    constructor(public name: string, public price: number) {}

    sumarPrecio(): number {
        return this.price;
    }

    print(indent: string): void {
        console.log(`${indent}${this.name}: $${this.price}`);
    }
}

class Caja_Composite implements componente {
    private children: componente[] = [];
  
    constructor(public name: string) {}

    add(child: componente): void {
        this.children.push(child);
    }

    remove(child: componente): void {
        const index = this.children.indexOf(child);
        this.children.splice(index, 1);
    }

    getChildren(): componente[] {
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

const product1 = new Producto_Hoja('Zapatos Nike', 50);
const product2 = new Producto_Hoja('Camisa Polo', 30);
const product3 = new Producto_Hoja('Pantalon Zara', 40);

const box_ropa = new Caja_Composite('Caja de Ropa');
box_ropa.add(product2);
box_ropa.add(product3);

const box_zapatos = new Caja_Composite('Caja de Zapatos');
box_zapatos.add(product1);

const pedido = new Caja_Composite('Pedido');
pedido.add(box_ropa);
pedido.add(box_zapatos);

console.log('Mostrar precio total del pedido');
console.log(`${+pedido.sumarPrecio()}$`); // Devuelve 120
console.log('');
console.log('Mostrar arbol de productos');
pedido.print(''); // Dibuja la estructura del árbol por consola