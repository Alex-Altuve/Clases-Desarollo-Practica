interface BuilderCar<T>{
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    setTripComputer(tripComputer: boolean): void;
    setGPS(gps: boolean): void;
    getResult(): T;
}

class CarManual{
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

class Car{
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

class CarBuilder implements BuilderCar<Car>{
    private car: Car;

    constructor(){
        this.car = new Car();
    }

    reset(): void {
        this.car = new Car();
    }

    setSeats(seats: number): void {
        this.car.seats = seats;
    }

    setEngine(engine: string): void {
        this.car.engine = engine ;
    }

    setTripComputer(tripComputer: boolean): void {
        this.car.tripComputer= tripComputer ;
    }

    setGPS(gps: boolean): void {
        this.car.gps= gps;
    }

    getResult(): Car{
        return this.car;
    }
}

class CarManualBuilder implements BuilderCar<CarManual>{
    private car: CarManual;

    constructor(){
        this.car = new CarManual();
    }

    reset(): void {
        this.car = new CarManual();
    }

    setSeats(seats: number): void {
        this.car.seatsInfo = `Seats: ${seats}`;
    }

    setEngine(engine: string): void {
        this.car.engineInfo = `Engine: ${engine}`;
    }

    setTripComputer(tripComputer: boolean): void {
        this.car.tripComputerInfo = `TripComputer ${tripComputer}` ;
    }

    setGPS(gps: boolean): void {
        this.car.gpsInfo = `Gps: ${gps}`;
    }

    getResult(): CarManual{
        return this.car;
    }
}

class DirectorV1<T,E>{
    private builder: BuilderCar<Car|CarManual>;

    constructor(builder: BuilderCar<Car|CarManual>){
        this.builder = builder;
    }

    
    makeSportsCar(): void{
        this.builder.reset();
        this.builder.setSeats(2);
        this.builder.setEngine('V8');
        this.builder.setTripComputer(true);
        this.builder.setGPS(true);
        console.log('Sport Car :', this.builder.getResult());
    }

    makeSUV(): void{
        this.builder.reset();
        this.builder.setSeats(4);
        this.builder.setEngine('V6');
        this.builder.setTripComputer(true);
        this.builder.setGPS(true);
        console.log('Car SUV:', this.builder.getResult());
    }
}

console.log('Client: Car Builder');
const DirectorV = new DirectorV1(new CarBuilder());
DirectorV.makeSUV();

console.log('');
console.log('Client: Car Manual Builder');
const DirectorV2 = new DirectorV1(new CarManualBuilder());
DirectorV2.makeSportsCar();