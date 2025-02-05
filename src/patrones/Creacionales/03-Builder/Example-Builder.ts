// Clase Car
class CarV1 {
    seats: number;
    engine: string;
    tripComputer: boolean;
    gps: boolean;

    constructor() {
        this.seats = 0;
        this.engine = '';
        this.tripComputer = false;
        this.gps = false;
    }
}

// Clase Manual
class ManualV1 {
    seatsInfo: string;
    engineInfo: string;
    tripComputerInfo: string;
    gpsInfo: string;

    constructor() {
        this.seatsInfo = '';
        this.engineInfo = '';
        this.tripComputerInfo = '';
        this.gpsInfo = '';
    }
}

// Interfaz Builder
interface BuilderV1 {
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    setTripComputer(hasComputer: boolean): void;
    setGPS(hasGPS: boolean): void;
}

// Clase CarBuilder
class CarBuilderV1 implements BuilderV1 {
    private car: CarV1;

    constructor() {
        this.car = new CarV1();
    }

    reset(): void {
        this.car = new CarV1();
    }

    setSeats(seats: number): void {
        this.car.seats = seats;
    }

    setEngine(engine: string): void {
        this.car.engine = engine;
    }

    setTripComputer(hasComputer: boolean): void {
        this.car.tripComputer = hasComputer;
    }

    setGPS(hasGPS: boolean): void {
        this.car.gps = hasGPS;
    }

    getProduct(): CarV1 {
        const product = this.car;
        this.reset();
        return product;
    }
}

// Clase CarManualBuilder
class CarManualBuilderV1 implements BuilderV1 {
    private manual: ManualV1;

    constructor() {
        this.manual = new ManualV1();
    }

    reset(): void {
        this.manual = new ManualV1();
    }

    setSeats(seats: number): void {
        this.manual.seatsInfo = `Asientos: ${seats}`;
    }

    setEngine(engine: string): void {
        this.manual.engineInfo = `Motor: ${engine}`;
    }

    setTripComputer(hasComputer: boolean): void {
        this.manual.tripComputerInfo = `Computadora de viaje: ${hasComputer}`;
    }

    setGPS(hasGPS: boolean): void {
        this.manual.gpsInfo = `GPS: ${hasGPS}`;
    }

    getProduct(): ManualV1 {
        const product = this.manual;
        this.reset();
        return product;
    }
}

// Clase Director
class Director_V1 {
    constructSportsCar(builder: BuilderV1): void {
        builder.reset();
        builder.setSeats(2);
        builder.setEngine('Sport Engine');
        builder.setTripComputer(true);
        builder.setGPS(true);
    }

    constructSUV(builder: BuilderV1): void {
        builder.reset();
        builder.setSeats(5);
        builder.setEngine('SUV Engine');
        builder.setTripComputer(false);
        builder.setGPS(true);
    }
}

// Código cliente
class ApplicationV2 {
    makeCar(): void {
        const director = new Director_V1();

        const carBuilder = new CarBuilderV1();
        director.constructSportsCar(carBuilder);
        const car = carBuilder.getProduct();
        console.log('Coche creado:', car);

        const manualBuilder = new CarManualBuilderV1();
        director.constructSportsCar(manualBuilder);
        const manual = manualBuilder.getProduct();
        console.log('Manual creado:', manual);
    }
}

// Ejecución
const app = new ApplicationV2();
app.makeCar();