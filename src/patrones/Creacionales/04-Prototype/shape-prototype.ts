// Clase base Shape
abstract class Shape {
    public x: number;
    public y: number;
    public color: string;

    constructor(shape?: Shape) {
        if (shape) {
            this.x = shape.x;
            this.y = shape.y;
            this.color = shape.color;
        } else {
            this.x = 0;
            this.y = 0;
            this.color = '';
        }
    }

    abstract clone(): Shape;
    abstract area(): number;
}

// Clase concreta Circle
class Circle extends Shape {
    public radius: number;

    constructor(radius: number, shape?: Circle) {
        super(shape);
        if (shape) {
            this.radius = shape.radius;
        } else {
            this.radius = radius;
        }
    }

    clone(): Shape {
        return new Circle(this.radius, this);
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

// Clase concreta Rectangle
class Rectangle extends Shape {
    public width: number;
    public height: number;

    constructor(width: number, height: number, shape?: Rectangle) {
        super(shape);
        if (shape) {
            this.width = shape.width;
            this.height = shape.height;
        } else {
            this.width = width;
            this.height = height;
        }
    }

    clone(): Shape {
        return new Rectangle(this.width, this.height, this);
    }

    area(): number {
        return this.width * this.height;
    }
}

// Ejemplo de uso
const circle1 = new Circle(5);
circle1.x = 10;
circle1.y = 20;
circle1.color = 'Red';

console.log('');
console.log('CIRCULO');
const circle2 = circle1.clone() as Circle;
console.log('Area (obj original):',circle1.area()); // Output: 78.53981633974483
console.log('Area (obj clonado):',circle2.area()); // Output: 78.53981633974483
console.log('X (obj original):',circle1.x); // Output: 10
console.log('Y (obj original):',circle1.y); // Output: 20
console.log('X (obj clonado):',circle2.x); // Output: 10
console.log('Y (obj clonado):',circle2.y); // Output: 20
console.log('Color circulo', circle2.color); // Output: Red


console.log('');
console.log('Rectangulo');
const rectangle1 = new Rectangle(10, 20);
rectangle1.x = 5;
rectangle1.y = 15;
rectangle1.color = 'Blue';

const rectangle2 = rectangle1.clone() as Rectangle;
console.log('Area (obj original):',rectangle1.area()); // Output: 200
console.log('Area (obj clonado):',rectangle2.area()); // Output: 200
console.log('X (obj original):',rectangle1.x); // Output: 5
console.log('Y (obj original):',rectangle1.y); // Output: 15
console.log('X (obj clonado):',rectangle2.x); // Output: 5
console.log('Y (obj clonado):',rectangle2.y); // Output: 15
console.log('Color rectangulo (obj clonado)',rectangle2.color); // Output: Blue