// Clase RoundHole (HoyoRedondo)
class RoundHole {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    public getRadius(): number {
        // Devuelve el radio del agujero.
        return this.radius;
    }

    public fits(peg: RoundPeg): boolean {
        return this.getRadius() >= peg.getRadius();
    }
}

// Clase RoundPeg (PiezaRedonda)
class RoundPeg {
    protected radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    public getRadius(): number {
        // Devuelve el radio de la pieza redonda.
        return this.radius;
    }
}

// Clase SquarePeg (PiezaCuadrada)
class SquarePeg {
    private width: number;

    constructor(width: number) {
        this.width = width;
    }

    public getWidth(): number {
        // Devuelve la anchura de la pieza cuadrada.
        return this.width;
    }
}

// Clase adaptadora para permitir que las piezas cuadradas encajen en hoyos redondos
class SquarePegAdapter extends RoundPeg {
    private peg: SquarePeg;

    constructor(peg: SquarePeg) {
        // Llama al constructor de RoundPeg con un valor simulado de radio.
        super(0);
        this.peg = peg;
    }

    public getRadius(): number {
        // El adaptador simula que es una pieza redonda.
        return this.peg.getWidth() * Math.sqrt(2) / 2;
    }
}

// Código cliente
const hole = new RoundHole(5);
const rpeg = new RoundPeg(5);
console.log(hole.fits(rpeg)); // verdadero

const smallSqPeg = new SquarePeg(5);
const largeSqPeg = new SquarePeg(10);

// Esto no compila (tipos incompatibles)
// hole.fits(smallSqPeg);

const smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
const largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);
console.log(hole.fits(smallSqPegAdapter)); // verdadero
console.log(hole.fits(largeSqPegAdapter)); // falso