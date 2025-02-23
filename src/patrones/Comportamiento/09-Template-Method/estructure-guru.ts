abstract class GameIA{
  coleccion: string[] = [];
  public TakeTurn(){
    this.collectResources();
    this.buildStructures();
    this.buildUnits();
    this.attack();
  };
  public collectResources(){
    console.log('collectResources');
    this.coleccion.push('oro'); 
  };
  public attack(){
    console.log('attacking');
    if(this.isEnemyNear()){
       console.log('enemy near');
       this.sendWarriors(1)
    }else{
        this.sendScouts(2)
    }
  };

  public isEnemyNear(): boolean{
    return true;
  };
  abstract buildStructures(): void;
  abstract buildUnits(): void;
  abstract sendScouts(position: number): void;
  abstract sendWarriors(position: number): void;
}


class OrcsAi extends GameIA{
    warriors: string[] = [];
    scouts: string[] = [];

    buildStructures(): void {
       this.scouts.push('torre');
    }
    buildUnits(): void {
        this.warriors.push('guerrero');
    }
    sendScouts(position: number): void {
        console.log(this.scouts[1-position]);
    }
    sendWarriors(position: number): void {
        console.log(this.warriors[1-position]);
    }

}

class MonstersAI extends GameIA{
    public collectResources(): void {
        this.coleccion.push('veneno');
    }
    buildStructures(): void {
        throw new Error("Method not implemented.");
    }
    buildUnits(): void {
        throw new Error("Method not implemented.");
    }
    sendScouts(position: number): void {
        throw new Error("Method not implemented.");
    }
    sendWarriors(position: number): void {
        throw new Error("Method not implemented.");
    }
    
}

const orcos = new OrcsAi();
orcos.TakeTurn();