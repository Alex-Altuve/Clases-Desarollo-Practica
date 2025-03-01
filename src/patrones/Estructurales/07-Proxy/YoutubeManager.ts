interface ThirdPartyYoutubeLib{
    listVideos(): void;
    getVideoInfo(id: number): string;
    downloadVideo(id: number): string;
}

class CachedYoutubeClass implements ThirdPartyYoutubeLib{
    private service!: ThirdPartyYoutubeLib;

    constructor(service: ThirdPartyYoutubeLib){
        this.service = service;
    }
    
    listVideos(): void {
        this.service.listVideos();
    }
    getVideoInfo(id: number): string {
        return this.service.getVideoInfo(id);
    }
    downloadVideo(id: number): string {
       return this.service.downloadVideo(id);
    }

}

class ThirdPartyYoutubeClass implements ThirdPartyYoutubeLib{
    private video: string[] = 
    ['Fuck Up The World - Lisa Manobal',
     'Candy - Doja Cat',
     'Zen - Jennie',
     'APT - Rose ft Bruno Mars'
    ];
    public listVideos(): void{
        this.video.forEach((video) => {
            console.log(`Video: ${video}`)
        })
    }

    public getVideoInfo(id: number): string{
        return this.video[id];
    }

    downloadVideo(id: number): string{
        return this.video[id] + 'video dowload';
    }
}

const cache = new CachedYoutubeClass(new ThirdPartyYoutubeClass)

console.log('Video descargado', cache.downloadVideo(0));
console.log('')


console.log('Video informacion',cache.getVideoInfo(2));
console.log('')

console.log('Listado de peliculas')
cache.listVideos();