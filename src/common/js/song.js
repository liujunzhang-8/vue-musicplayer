

export default class Song {
    constructor({ singer_id, singer_mid, singer, singers, album_name, duration, image, url}) {
        this.singer_id = singer_id
        this.singer_mid = singer_mid
        this.singer = singer
        this.singers = singers
        this.album_name = album_name
        this.duration = duration
        this.image = image
        this.url = url
    }
}

export function createSong(musicData) {
    return new Song({
        singer_id: musicData.singer_id,
        singer_mid: musicData.singer_mid,
        singer: musicData.singer,
        singers: filterSinger(musicData.singers),
        album_name: musicData.album_name,
        duration: musicData.interval,
        image: `https://y.qq.com/music/photo_new/T002R300x300M000${musicData.album_mid}.jpg?max_age=2592000`,
        url: `https://y.qq.com/n/ryqq/albumDetail/${musicData.album_mid}`
    })
}

function filterSinger(singer) {
    let ret = []
    if(!singer) {
        return ''
    }
    singer.forEach(s => {
        ret.push(s.singer_name)
    })
    return ret.join('/')
}
