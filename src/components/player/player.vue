<template>
  <div class="player" v-show="playlist.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" alt="" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.album_name }}</h1>
          <h2 class="subtitle">{{ currentSong.singer_name }}</h2>
        </div>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image" alt="" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <scroll
            class="middle-r"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  v-for="(line, index) in currentLyric.lines"
                  :key="index"
                  class="text"
                  :class="{ 'current': currentLineNum === index }"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                @percentChange="onProgressBarChange"
              ></progress-bar>
            </div>
            <span class="time time-l">{{ format(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon" @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img
            :class="cdCls"
            width="40"
            height="40"
            :src="currentSong.image"
            alt=""
          />
        </div>
        <div class="text">
          <h2 class="name">{{ currentSong.album_name }}</h2>
          <p class="desc">{{ currentSong.singer_name }}</p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i
              @click.stop="togglePlaying"
              class="icon-mini"
              :class="miniIcon"
            ></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop='showPlaylist'>
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio
      ref="audio"
      :src="currentSong.url"
      rossOrigin="“anonymous”"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "../../common/js/dom";
import ProgressBar from "../../base/progress-bar/progress-bar";
import ProgressCircle from "../../base/progress-circle/progress-circle";
import Lyric from "lyric-parser";
import Scroll from "../../base/scroll/scroll";
import { playerMixin } from "../../common/js/mixin";
import { playMode } from "../../common/js/config";
import { Base64 } from "js-base64";
import Playlist from '../../components/playlist/playlist'

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  mixins: [playerMixin],
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    Playlist
  },
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
    };
  },
  created() {
      this.touch = {}
      this.getLyric()
  },
  computed: {
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    miniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    ...mapGetters(["currentIndex", "fullScreen", "playing"]),
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentTime = 0;
        this.playingLyric = "";
        this.currentLineNum = 0;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audio.play();
        this.getLyric();
      }, 1000);
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    },
    fullScreen(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.lyricList.refresh();
        }, 20);
      }
    },
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();

      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        },
        60: {
          transform: `translate3d(0,0,0) scale(1, 1)`,
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`,
        },
      };

      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear",
        },
      });

      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    middleTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY > Math.abs(deltaX))) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
    //   Math.abs 绝对值
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0 ,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.middleL.style[transitionDuration] = 0;
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      let offsetWidth;
      let opacity;
      if (this.currentShow === "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      const time = 300;
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0, 0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },  
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.setPlayingState(true);
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    getLyric() {
      let lyricCode = "W3RpOuS6keWxsV0KW2FyOuWHpOWHsOS8oOWlh10KW2FsOue7j+WFuOWSj+a1geS8oOesrOS6lOWtoyDnrKw05pyfXQpbYnk6dl9lbWlseWx1XQpbb2Zmc2V0OjBdClswMDowMC4wMF3kupHlsbEgKExpdmUpIC0g5Yek5Yew5Lyg5aWHClswMDowMC44NF3or43vvJrvvIjlhYPvvInlvKDlhbvmtakv5ZSQ5oGsClswMDowMS42OF3mm7LvvJpaRUVWL+W8l+WFsOWlhwpbMDA6MDIuNTJd5Yi25L2c5Lq677yaWkVFVgpbMDA6MDMuMzZd6Z+z5LmQ5oC755uR77ya5YiY5Y2TQOe7tOS8tOmfs+S5kApbMDA6MDQuMjFd5LmQ5Zui77yaViBCYW5kClswMDowNS4wNV3lvKbkuZDvvJrpnbPmtbfpn7PCru+4j+euoeW8puS5kOWbogpbMDA6MDUuODld5re36Z+z77ya6buE5Y+v54ixQOe7tOS8tOmfs+S5kApbMDA6MDYuNzNd6Z+z6aKR57yW6L6R77ya5a2Z56GV5a2YICDnn7PooYxA57u05Ly06Z+z5LmQClswMDowNy41N13oirHlp5DvvJoKWzAwOjA4LjQyXeS6keadpeWxseabtOS9syDkupHljrvlsbHlpoLnlLsKWzAwOjE3Ljc4XQpbMDA6MTkuNDJd5bGx5Zug5LqR5pmm5piOIOS6keWFseWxsemrmOS4iwpbMDA6MjcuODhd5ZCI77yaClswMDoyOC43MV3miJHlm57mnJsg5p2l5pe26LevIOiwgeWutuWtqeerpei/veidtOidtgpbMDA6MzQuMTld5LuW5LiA56yRIOaAjuS5iOern+eEtuiQveaIkCDmiJHnmoTohLgKWzAwOjM5LjgzXeagkeW9sea3sSDnrJHor63ol48g5a+75LiN6KeB5bCP5bCP5qih5qC3ClswMDo0NS40Nl3lsbHot6/kuIog6LWw5p2l55m96KGj5bCR5bm06YOOClswMDo1MS4yMF3miJHpgaXmnJsg5Y675pe26LevIOiAgee/geW9kuadpei4j+WklemYswpbMDA6NTYuNzNd5LuW54K55aS0IOWPq+aIkeaFouS6m+eci+iKsSDkuI3ljIblv5kKWzAxOjAyLjM5XeS6keiBmuaVoyDlj5jkuI7lubsg6I2J5pyo5aaC5pyf5Zyw55Sf6ZW/ClswMTowOC4wNF3mhL/lj6rmhL8g5LiN6LSf576O5pmv5aW95pe25YWJClswMToxMy45Ml3oirHlp5DvvJoKWzAxOjE0LjIzXeaIkeS7pemrmOWxseS4uuWdmiDmiJHku6XmtYHmsLTkuLrmg4UKWzAxOjE2Ljg3XeaIkeS7peWbm+Wto+S4uuWHrSDkuZjnnYDpo47kupHogIzooYwKWzAxOjE5Ljc1XeaIkeWcqOWxsemXtOiAjOeriyDkuIDnlJ/muIXmmI7kuLrkuYkKWzAxOjIyLjgyXeWSjOmjnum4n+i1sOWFvSDlkIzooYzov5nniYflpKnlnLAKWzAxOjI1LjQ0XeaIkeS7pemrmOWxseS4uuWdmiDmiJHku6XmtYHmsLTkuLrmg4UKWzAxOjI4LjUyXeWuiOWygeaciOS4uuWlkSDniLHmnIDnvo7kuIDmnJ3kuIDlpJUKWzAxOjMxLjAwXeaIkeWcqOWxsemXtOiAjOeriyDkuIDnlJ/muIXmmI7kuLrkuYkKWzAxOjM0LjExXeinguS6keaVo+S6kei1t+iKseiQveiKseW8gApbMDE6MzUuNjJd5pyJ6aOO5pyJ6Zuo5pyJ5pm0ClswMTozNi42OV3mr4Xlk6VSYXDvvJoKWzAxOjM3LjIxXeimgei1sOi/hyDljYPlsbHkuIfmsLQg5p2l5ZKM6Ieq5bex55u46KeBClswMTo0MC4xM13lhL/ml7Yg6L+9552A6J206J22IOWwkeW5tCDor7vlhpnor5fnr4cKWzAxOjQyLjkxXeaXtuWFieaYryDkuIDniYfkupHmtbcg5Lq655Sf5pyJIOWFieW9seaYjuaalwpbMDE6NDUuNzJd566h5aSa5bCRIOWOu+WSjOadpSDml6XmnIjkuI3mlLkg6Z2S5bGx5bi45ZyoClswMTo0OC42NV3ku7vmiJHmvYfmtJLni6zooYwg5LiA5Lq65LiA5b2x6KeB5aSp5ZywClswMTo1MS40Ml3mlrnog73nnIvmuIXoh6rlt7Eg5pyA566A5Y2V55qE6YKj6aKX5b+DClswMTo1NC4yMl3kuI3mgKXnnYDljrvlvoDlsbHpobYg5q+P5LiA5q2l6YO95piv6aOO5pmvClswMTo1Ny4wNl3niLHohJrkuIvmnIDnvo7nmoTlnJ/lnLAg5Zub5a2j5YWJ6Zi055qE5rex5oOFClswMjowMC42OV3lkIjvvJoKWzAyOjAxLjA1XQpbMDI6MDEuOTBd5oiR5Zue5pybIOadpeaXtui3ryDosIHlrrblrannq6Xov73onbTonbYKWzAyOjA3LjM0XeS7luS4gOeskSDmgI7kuYjnq5/nhLbokL3miJAg5oiR55qE6IS4ClswMjoxMi45N13moJHlvbHmt7Eg56yR6K+t6JePIOWvu+S4jeingeWwj+Wwj+aooeagtwpbMDI6MTguNjhd5bGx6Lev5LiKIOi1sOadpeeZveiho+WwkeW5tOmDjgpbMDI6MjQuMzFd6Iqx5aeQ77yaClswMjoyNC42Nl3kuI3lv4Xov70g6YKj6Lqr5aSW55qE5rWu5ZCNClswMjoyOS4zN10KWzAyOjI5LjkwXeS4jeaDhuaAhSDpgqPonL/onJLkuI7pq5jkvY4KWzAyOjM1LjY0XeW9k+WmguS6kSDpmo/po47otbfoiJ7nurXmg4UKWzAyOjQxLjIzXeS5n+WmguWxsSDluLjlrojov5nkuIDmlrnpnZIKWzAyOjQ2LjI0XeavheWTpVJhcO+8mgpbMDI6NDYuNzldClswMjo0Ny4zM13kuJbpl7Qg5oC75pyJ56a75YirIOWwseWDjyDlpKfmoJHokL3lj7YKWzAyOjUwLjA0XeS6uueUnyDlm5vlraPkuqTlj6Ag5rS75ZyoIOatpOaZr+atpOmXtApbMDI6NTMuMTVd5oiR5ZCs6L+H6J2J5aOwIOWwseacqiDovpzotJ/lpI/lpJwKWzAyOjU1Ljk0XeaIkei4j+i/h+WGrOmbqiDlsLHkvJog6YGH6KeB5pil5aSpClswMjo1OC43Nl0KWzAyOjU5LjQyXemdkuWxseW4uOWcqCDkupHmtbfkuYvpl7QKWzAzOjAxLjg1XQpbMDM6MDIuNDdd576O5Zyo5Y+Y5bm7IOS6puWcqOS4jeWPmApbMDM6MDQuNjFdClswMzowNS4yMl3kuIfnianoi43nlJ8g5ZCE5pyJ5ZCE55qE5pe26IqCClswMzowOC4yNV3orqnmiJHmsonphokg5q2k5Yi75Y2z5rC46L+cClswMzoxMS4zOF3lkIjvvJoKWzAzOjExLjY5XQpbMDM6MTIuMzRd5oiR6YGl5pybIOWOu+aXtui3ryDogIHnv4HlvZLmnaXouI/lpJXpmLMKWzAzOjE3LjkyXeS7lueCueWktCDlj6vmiJHmhaLkupvnnIvoirEg5LiN5YyG5b+ZClswMzoyMy41NV3kupHogZrmlaMg5Y+Y5LiO5bm7IOiNieacqOWmguacn+WcsOeUn+mVvwpbMDM6MjkuMjFd5oS/5Y+q5oS/IOS4jei0n+e+juaZr+WlveaXtuWFiQpbMDM6MzUuMzBd6Iqx5aeQ5b+155m977yaClswMzozNi41Nl0KWzAzOjM3Ljg3XeWAmuS7l+eri+S6keaymSDlm57pppbop4HlsbHlrrYKWzAzOjQ0LjgwXQpbMDM6NDYuNjVd6YeO6bm/55yg5bGx6I2JIOWxseeMv+aIj+mHjuiKsQpbMDM6NTMuNjBd5q+F5ZOl5b+155m977yaClswMzo1NC41OF3kupHpnJ4g5oiR54ix5bGx5peg5Lu3ClswMzo1Ny41NV0KWzAzOjU4LjM0Xeeci+aXtiDooYzouI8g5LqR5bGx5Lmf54ix5ZKx"
      let lyric = Base64.decode(lyricCode)
      this.currentLyric = new Lyric(lyric, this.handleLyric);
      console.log(this.currentLyric, "到底又没一呢");
      if (this.playing) {
        this.currentLyric.play();
      }
      // Base64.decode(lyricCode).then((lyric) => {
      //     if(this.currentSong.lyric !== lyric) {
      //         return
      //     }

      // }).catch(() => {
      //     this.currentLyric = null
      //     this.playingLyric = ''
      //     this.currentLineNum = 0
      // })
    },
    handleLyric({lineNum, txt}) {
        this.currentLineNum = lineNum
        if(lineNum > 5) {
            let lineEl = this.$refs.lyricLine[lineNum - 5]
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
            this.$refs.lyricList.scrollTo(0,0,1000)
        }
        this.playingLyric = txt
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale,
      };
    },
    showPlaylist() {
        this.$refs.playlist.show()
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
    //   setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode: "SET_PLAY_MODE",
      setPlaylist: "SET_PLAYLIST",
    }),
    ...mapActions(["insertSong"]),
  },
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixin.scss";
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        // no-wrap()
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30% auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        // no-wrap()
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc {
        // no-wrap()
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }
      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
