// Clase que representa un archivo de video
class VideoFile {
    constructor(private filename: string, private format: string) {}

    public getFilename(): string {
        return this.filename;
    }

    public getFormat(): string {
        return this.format;
    }
}

// Clase que representa un códec
class Codec {
    public compress(videoFile: VideoFile): void {
        console.log(`Compressing ${videoFile.getFilename()} to ${videoFile.getFormat()}`);
    }
}

// Clase que representa la mezcla de audio
class AudioMixer {
    public mix(audioFile: string): void {
        console.log(`Mixing audio from ${audioFile}`);
    }
}

// Clase que maneja la lectura de bitrate
class BitrateReader {
    public read(videoFile: VideoFile): void {
        console.log(`Reading bitrate from ${videoFile.getFilename()}`);
    }
}

// Clase Facade que simplifica la conversión de video
class VideoConverter {
    private codec: Codec;
    private bitrateReader: BitrateReader;
    private audioMixer: AudioMixer;

    constructor() {
        this.codec = new Codec();
        this.bitrateReader = new BitrateReader();
        this.audioMixer = new AudioMixer();
    }

    public convertVideo(filename: string, format: string, audioFile: string): void {
        const videoFile = new VideoFile(filename, format);
        
        // Usar los componentes para convertir el video
        this.bitrateReader.read(videoFile);
        this.codec.compress(videoFile);
        this.audioMixer.mix(audioFile);
        
        console.log(`Video ${videoFile.getFilename()} converted to ${format}`);
    }
}

// Código del cliente
function application_v5() {
    const videoConverter = new VideoConverter();
    videoConverter.convertVideo("my_video.mp4", "avi", "my_audio.mp3");
}

// Ejecutar la aplicación
application_v5();