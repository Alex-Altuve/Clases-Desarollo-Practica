// La clase TreeType contiene una parte del estado de un árbol.
// Estos campos almacenan valores que son únicos para cada árbol
// en particular. Por ejemplo, aquí no encontrarás las
// coordenadas del árbol. Pero la textura y los colores que
// comparten muchos árboles sí están aquí.
class TreeType {
    constructor(
        public name: string,
        public color: string,
        public texture: string
    ) {}

    public draw(canvas: any, x: number, y: number): void {
        // 1. Crea un mapa de bits de un tipo, color y textura
        // concretos.
        // 2. Dibuja el mapa de bits en el lienzo con las
        // coordenadas X y Y.
        console.log(`Dibujando ${this.name} en (${x}, ${y}) con color ${this.color} y textura ${this.texture}`);
        // Aquí iría la lógica para dibujar en el canvas.
    }
}

// La fábrica Flyweight decide si reutiliza el Flyweight
// existente o si crea un nuevo objeto.
class TreeFactory {
    private static treeTypes: Map<string, TreeType> = new Map();

    public static getTreeType(name: string, color: string, texture: string): TreeType {
        const key = `${name}-${color}-${texture}`;
        let type = this.treeTypes.get(key);

        if (!type) {
            type = new TreeType(name, color, texture);
            this.treeTypes.set(key, type);
        }

        return type;
    }
}

// El objeto contextual contiene la parte extrínseca del estado
// del árbol.
class Tree {
    constructor(
        public x: number,
        public y: number,
        public type: TreeType
    ) {}

    public draw(canvas: any): void {
        this.type.draw(canvas, this.x, this.y);
    }
}

// Las clases Tree y Forest son los clientes de Flyweight.
class Forest {
    private trees: Tree[] = [];

    public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
        const type = TreeFactory.getTreeType(name, color, texture);
        const tree = new Tree(x, y, type);
        this.trees.push(tree);
    }

    public draw(canvas: any): void {
        for (const tree of this.trees) {
            tree.draw(canvas);
        }
    }
}

// Ejemplo de uso
function application() {
    const forest = new Forest();
    const canvas = {}; // Simulación de canvas

    forest.plantTree(10, 20, "Pine", "Green", "Needles");
    forest.plantTree(15, 25, "Pine", "Green", "Needles");
    forest.plantTree(20, 30, "Oak", "Brown", "Leaves");
    
    forest.draw(canvas);
}

// Ejecutar la aplicación
application();