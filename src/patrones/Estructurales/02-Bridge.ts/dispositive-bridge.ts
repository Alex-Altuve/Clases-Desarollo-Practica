/// * * abstraccion
class Remote {
   protected device: Device;

   constructor(device: Device){
    this.device = device;
   }

   togglePower(): void{
        if(this.device.isEnabled()){
            this.device.disable();
        }else{
            this.device.enable();
        }
   }
   volumeDown(): void{
        const old = this.device.getVolume();
        if(old != 0) this.device.setVolume(old-1);
   }
   volumeUp(): void{
       const old = this.device.getVolume();
       this.device.setVolume(old+1);
   }
   channelDown(): void{
        const old = this.device.getChannel();
        if(old != 0) this.device.setChannel(old-1);
   }
   channelUp(): void{
        const old = this.device.getChannel();
        this.device.setChannel(old+1);
   }
}

class AdvancedRemote extends Remote{
    

    constructor(device: Device){
        super(device);
    }   
    mute():void{
        this.device.setVolume(0);
    }
}

/// implementacion
interface Device{
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// clases concretas
class Radio implements Device{
    private volume: number;
    private IsEnabled: boolean;
    private channel: number;
    private enable_var: boolean;
    private disable_var: boolean;
    
    constructor(){
        this.IsEnabled = true;
        this.disable_var = false;
        this.volume = 10;
        this.channel = 1;
        this.enable_var = false;
    }

    isEnabled(): boolean {
        return this.IsEnabled;
    }

    enable(): void {
        this.enable_var = true;
    }

    disable(): void {
        this.disable_var = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        this.volume = percent;
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
    }

}

class TV implements Device{
    private volume: number;
    private IsEnabled: boolean;
    private channel: number;
    private enable_var: boolean;
    private disable_var: boolean;
    
    constructor(){
        this.IsEnabled = true;
        this.disable_var = false;
        this.volume = 10;
        this.channel = 1;
        this.enable_var = false;
    }

    isEnabled(): boolean {
        return this.IsEnabled;
    }

    enable(): void {
        this.enable_var = true;
    }

    disable(): void {
        this.disable_var = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        this.volume = percent;
    }

    getChannel(): number {
        return this.channel;
    }
    
    setChannel(channel: number): void {
        this.channel = channel;
    }
}
/// * *

// Ejemplo de uso
const tv = new TV();
const remote = new Remote(tv);
const advancedRemote = new AdvancedRemote(tv);

remote.togglePower();
console.log('tv encendida: ', tv.isEnabled()); // true

remote.volumeUp();
console.log('volumen', tv.getVolume()); // 11

advancedRemote.mute();
console.log('volumen', tv.getVolume()); // 0