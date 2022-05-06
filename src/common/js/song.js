// import { getLyric } from "../../api/song"
// import { ERR_OK } from "../../api/config"
import { Base64 } from "js-base64"

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

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        let lyricCode = "W3RpOuS6keWxsV0KW2FyOuWHpOWHsOS8oOWlh10KW2FsOue7j+WFuOWSj+a1geS8oOesrOS6lOWtoyDnrKw05pyfXQpbYnk6dl9lbWlseWx1XQpbb2Zmc2V0OjBdClswMDowMC4wMF3kupHlsbEgKExpdmUpIC0g5Yek5Yew5Lyg5aWHClswMDowMC44NF3or43vvJrvvIjlhYPvvInlvKDlhbvmtakv5ZSQ5oGsClswMDowMS42OF3mm7LvvJpaRUVWL+W8l+WFsOWlhwpbMDA6MDIuNTJd5Yi25L2c5Lq677yaWkVFVgpbMDA6MDMuMzZd6Z+z5LmQ5oC755uR77ya5YiY5Y2TQOe7tOS8tOmfs+S5kApbMDA6MDQuMjFd5LmQ5Zui77yaViBCYW5kClswMDowNS4wNV3lvKbkuZDvvJrpnbPmtbfpn7PCru+4j+euoeW8puS5kOWbogpbMDA6MDUuODld5re36Z+z77ya6buE5Y+v54ixQOe7tOS8tOmfs+S5kApbMDA6MDYuNzNd6Z+z6aKR57yW6L6R77ya5a2Z56GV5a2YICDnn7PooYxA57u05Ly06Z+z5LmQClswMDowNy41N13oirHlp5DvvJoKWzAwOjA4LjQyXeS6keadpeWxseabtOS9syDkupHljrvlsbHlpoLnlLsKWzAwOjE3Ljc4XQpbMDA6MTkuNDJd5bGx5Zug5LqR5pmm5piOIOS6keWFseWxsemrmOS4iwpbMDA6MjcuODhd5ZCI77yaClswMDoyOC43MV3miJHlm57mnJsg5p2l5pe26LevIOiwgeWutuWtqeerpei/veidtOidtgpbMDA6MzQuMTld5LuW5LiA56yRIOaAjuS5iOern+eEtuiQveaIkCDmiJHnmoTohLgKWzAwOjM5LjgzXeagkeW9sea3sSDnrJHor63ol48g5a+75LiN6KeB5bCP5bCP5qih5qC3ClswMDo0NS40Nl3lsbHot6/kuIog6LWw5p2l55m96KGj5bCR5bm06YOOClswMDo1MS4yMF3miJHpgaXmnJsg5Y675pe26LevIOiAgee/geW9kuadpei4j+WklemYswpbMDA6NTYuNzNd5LuW54K55aS0IOWPq+aIkeaFouS6m+eci+iKsSDkuI3ljIblv5kKWzAxOjAyLjM5XeS6keiBmuaVoyDlj5jkuI7lubsg6I2J5pyo5aaC5pyf5Zyw55Sf6ZW/ClswMTowOC4wNF3mhL/lj6rmhL8g5LiN6LSf576O5pmv5aW95pe25YWJClswMToxMy45Ml3oirHlp5DvvJoKWzAxOjE0LjIzXeaIkeS7pemrmOWxseS4uuWdmiDmiJHku6XmtYHmsLTkuLrmg4UKWzAxOjE2Ljg3XeaIkeS7peWbm+Wto+S4uuWHrSDkuZjnnYDpo47kupHogIzooYwKWzAxOjE5Ljc1XeaIkeWcqOWxsemXtOiAjOeriyDkuIDnlJ/muIXmmI7kuLrkuYkKWzAxOjIyLjgyXeWSjOmjnum4n+i1sOWFvSDlkIzooYzov5nniYflpKnlnLAKWzAxOjI1LjQ0XeaIkeS7pemrmOWxseS4uuWdmiDmiJHku6XmtYHmsLTkuLrmg4UKWzAxOjI4LjUyXeWuiOWygeaciOS4uuWlkSDniLHmnIDnvo7kuIDmnJ3kuIDlpJUKWzAxOjMxLjAwXeaIkeWcqOWxsemXtOiAjOeriyDkuIDnlJ/muIXmmI7kuLrkuYkKWzAxOjM0LjExXeinguS6keaVo+S6kei1t+iKseiQveiKseW8gApbMDE6MzUuNjJd5pyJ6aOO5pyJ6Zuo5pyJ5pm0ClswMTozNi42OV3mr4Xlk6VSYXDvvJoKWzAxOjM3LjIxXeimgei1sOi/hyDljYPlsbHkuIfmsLQg5p2l5ZKM6Ieq5bex55u46KeBClswMTo0MC4xM13lhL/ml7Yg6L+9552A6J206J22IOWwkeW5tCDor7vlhpnor5fnr4cKWzAxOjQyLjkxXeaXtuWFieaYryDkuIDniYfkupHmtbcg5Lq655Sf5pyJIOWFieW9seaYjuaalwpbMDE6NDUuNzJd566h5aSa5bCRIOWOu+WSjOadpSDml6XmnIjkuI3mlLkg6Z2S5bGx5bi45ZyoClswMTo0OC42NV3ku7vmiJHmvYfmtJLni6zooYwg5LiA5Lq65LiA5b2x6KeB5aSp5ZywClswMTo1MS40Ml3mlrnog73nnIvmuIXoh6rlt7Eg5pyA566A5Y2V55qE6YKj6aKX5b+DClswMTo1NC4yMl3kuI3mgKXnnYDljrvlvoDlsbHpobYg5q+P5LiA5q2l6YO95piv6aOO5pmvClswMTo1Ny4wNl3niLHohJrkuIvmnIDnvo7nmoTlnJ/lnLAg5Zub5a2j5YWJ6Zi055qE5rex5oOFClswMjowMC42OV3lkIjvvJoKWzAyOjAxLjA1XQpbMDI6MDEuOTBd5oiR5Zue5pybIOadpeaXtui3ryDosIHlrrblrannq6Xov73onbTonbYKWzAyOjA3LjM0XeS7luS4gOeskSDmgI7kuYjnq5/nhLbokL3miJAg5oiR55qE6IS4ClswMjoxMi45N13moJHlvbHmt7Eg56yR6K+t6JePIOWvu+S4jeingeWwj+Wwj+aooeagtwpbMDI6MTguNjhd5bGx6Lev5LiKIOi1sOadpeeZveiho+WwkeW5tOmDjgpbMDI6MjQuMzFd6Iqx5aeQ77yaClswMjoyNC42Nl3kuI3lv4Xov70g6YKj6Lqr5aSW55qE5rWu5ZCNClswMjoyOS4zN10KWzAyOjI5LjkwXeS4jeaDhuaAhSDpgqPonL/onJLkuI7pq5jkvY4KWzAyOjM1LjY0XeW9k+WmguS6kSDpmo/po47otbfoiJ7nurXmg4UKWzAyOjQxLjIzXeS5n+WmguWxsSDluLjlrojov5nkuIDmlrnpnZIKWzAyOjQ2LjI0XeavheWTpVJhcO+8mgpbMDI6NDYuNzldClswMjo0Ny4zM13kuJbpl7Qg5oC75pyJ56a75YirIOWwseWDjyDlpKfmoJHokL3lj7YKWzAyOjUwLjA0XeS6uueUnyDlm5vlraPkuqTlj6Ag5rS75ZyoIOatpOaZr+atpOmXtApbMDI6NTMuMTVd5oiR5ZCs6L+H6J2J5aOwIOWwseacqiDovpzotJ/lpI/lpJwKWzAyOjU1Ljk0XeaIkei4j+i/h+WGrOmbqiDlsLHkvJog6YGH6KeB5pil5aSpClswMjo1OC43Nl0KWzAyOjU5LjQyXemdkuWxseW4uOWcqCDkupHmtbfkuYvpl7QKWzAzOjAxLjg1XQpbMDM6MDIuNDdd576O5Zyo5Y+Y5bm7IOS6puWcqOS4jeWPmApbMDM6MDQuNjFdClswMzowNS4yMl3kuIfnianoi43nlJ8g5ZCE5pyJ5ZCE55qE5pe26IqCClswMzowOC4yNV3orqnmiJHmsonphokg5q2k5Yi75Y2z5rC46L+cClswMzoxMS4zOF3lkIjvvJoKWzAzOjExLjY5XQpbMDM6MTIuMzRd5oiR6YGl5pybIOWOu+aXtui3ryDogIHnv4HlvZLmnaXouI/lpJXpmLMKWzAzOjE3LjkyXeS7lueCueWktCDlj6vmiJHmhaLkupvnnIvoirEg5LiN5YyG5b+ZClswMzoyMy41NV3kupHogZrmlaMg5Y+Y5LiO5bm7IOiNieacqOWmguacn+WcsOeUn+mVvwpbMDM6MjkuMjFd5oS/5Y+q5oS/IOS4jei0n+e+juaZr+WlveaXtuWFiQpbMDM6MzUuMzBd6Iqx5aeQ5b+155m977yaClswMzozNi41Nl0KWzAzOjM3Ljg3XeWAmuS7l+eri+S6keaymSDlm57pppbop4HlsbHlrrYKWzAzOjQ0LjgwXQpbMDM6NDYuNjVd6YeO6bm/55yg5bGx6I2JIOWxseeMv+aIj+mHjuiKsQpbMDM6NTMuNjBd5q+F5ZOl5b+155m977yaClswMzo1NC41OF3kupHpnJ4g5oiR54ix5bGx5peg5Lu3ClswMzo1Ny41NV0KWzAzOjU4LjM0Xeeci+aXtiDooYzouI8g5LqR5bGx5Lmf54ix5ZKx"
        return new Promise((resolve) => {
            this.lyric = Base64.decode(lyricCode)
            console.log(this.lyric, '获取到的歌词能否打印出来呢');
            resolve(this.lyric)
        })
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
