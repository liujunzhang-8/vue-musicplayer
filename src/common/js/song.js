

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


// http://dl.stream.qqmusic.qq.com/RS02060tZKLF4Jux2z.mp3?guid=1630613491&vkey=4329DCB81024B8B3BAE180D4C2F05D31A241F056D3C6F6D3B5B8107B45957F14B3C4877878769DC1AFDB5F1F892324B523E76D112E79F0D8&uin=&fromtag=120002

// http://dl.stream.qqmusic.qq.com/C400000ylh3K1haOh7.m4a?guid=9747116030&vkey=FF536DB40342D4261DE8EB60A442BF6DCB88D8C5B46EC8B9DC1C7614BFA530E6CFBDBF0B003E0FDE102E579AB6B06B28C22C2797594016D7&uin=&fromtag=120002

// http://dl.stream.qqmusic.qq.com/C400004FZzwj4Z5Kie.m4a?guid=1516064830&vkey=794314452DCFCF25A29739641F26A76C7F2E183962380DBA7269A9A1870174726A3133522437BCB7D49276553D6E2EFCCF791F0541B48455&uin=&fromtag=120002

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
