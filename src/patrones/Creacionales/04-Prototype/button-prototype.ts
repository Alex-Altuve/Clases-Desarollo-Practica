interface PrototypeV1{
    clone(): PrototypeV1;
    getColor(): string;
}

class ButtonV3 implements PrototypeV1{
    private x: number;
    private y: number;
    private color: string;

    constructor(button?: ButtonV3){
        if(button){
            this.x = button.x;
            this.y = button.y;
            this.color = button.color;
        }else{
            this.x = 0;
            this.y = 0;
            this.color = '';
        }
    }

    getColor(): string {
        return 'Blue';
    }

    clone(): PrototypeV1 {
        return new ButtonV3(this);
    }
    

    /// para cambiar los valores
    setX(x: number): void {
        this.x = x;
    }

   
    setY(y: number): void {
        this.y = y;
    }

    

    setColor(color: string): void {
        this.color = color;
    }
}

class PrototypeRegistry{
    private items: PrototypeV1[] = [];

    addItem(id:number, item: PrototypeV1){
        this.items[id] = item;
    }
    getById(id:number): PrototypeV1{
        return this.items[id].clone();
    }
    getByColor(color: string): PrototypeV1{
        const item = Object.values(this.items).find(item => item.getColor() === color);
        if (!item) {
            throw new Error(`Item with color ${color} not found`);
        }
        return item.clone();
    }
}

// Función para comparar dos objetos
function deepEqualV1(obj1: any, obj2: any): boolean {
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
        if (!keys2.includes(key) || !deepEqualV1(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}


// Ejemplo de uso
const Button_A_Clonar = new ButtonV3();
Button_A_Clonar.setX(10);
Button_A_Clonar.setY(20);
Button_A_Clonar.setColor('Red');
///////
const registry = new PrototypeRegistry();
const button1 = new ButtonV3();
registry.addItem(1, button1);


const clonedButton = registry.getById(1);
console.log(clonedButton.getColor()); // Output: Blue

const clonedButtonByColor = registry.getByColor('Blue');
console.log(clonedButtonByColor.getColor()); // Output: Blue


console.log('Comprobar que ambos objetos son iguales');
console.log('Objeto original:', button1);
console.log('Objeto clonado (al obtener por id):', clonedButton);
console.log('Ambos objetos son exactamente iguales (clones):', deepEqualV1(button1, clonedButton)); // Output: true