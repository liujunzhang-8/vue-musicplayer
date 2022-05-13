<template>
  <scroll
    class="suggest"
    ref="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text">{{item.songname}}</p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from "../../base/scroll/scroll";
import Loading from "../../base/loading/loading";
import NoResult from "../../base/no-result/no-result";
import { search } from "../../api/search";
import { ERR_OK } from "../../api/config";
import { createSong } from "../../common/js/song";
import { mapMutations, mapActions } from "vuex";
import Singer from "../../common/js/singer";

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
    showSinger: {
      type: Boolean,
      default: true,
    },
    query: {
      type: String,
      default: "",
    },
  },
  components: {
    Scroll,
    Loading,
    NoResult,
  },
  data() {
    return {
      page: 2,
      pullup: true,
      beforeScroll: true,
      hasMore: true,
      result: [],
    };
  },
  computed: {},
  watch: {
      query(newQuery) {
          this.search(newQuery)
      }
  },
  methods: {
      refresh() {
          this.$refs.suggest.refresh()
      },
      search() {
          this.page = 1
          this.hasMore = true
          this.$refs.suggest.scrollTo(0, 0)
          search(this.query, this.page, perpage).then(res => {
              if(res.result === ERR_OK) {
                  this.result = res.data.list
                  this._checkMore(res.data)
              }
          })
      },
      searchMore() {
          if(!this.hasMore) {
              return
          }
          this.page++
          search(this.query, this.page, perpage).then(res => {
              if(res.result === ERR_OK) {
                  this.result = this.result.concat(this._getResult(res.data.list))
                  console.log('收到回复', perpage);
                  this._checkMore(res.data)
              }
          })
      },
      listScroll() {
          this.$emit('listScroll')
      },
      selectItem(item) {
          if(item.type === TYPE_SINGER) {
              const singer = new Singer({
                  id: item.singermid,
                  name: item.singername
              })
              this.$router.push({
                  path: `/search/${singer.id}`
              })
              this.setSinger(singer)
          } else {
              this.insertSong(item)
          }
          this.$emit('select', item)
      },
      getDisplayName(item) {
          if(item.type === TYPE_SINGER) {
              return item.singername
          } else {
              return `${item.name} - ${item.singer}`
          }
      },
      getIconCls(item) {
          if(item.type === TYPE_SINGER) {
              return 'icon-mine'
          } else {
              return 'icon-music'
          }
      },
      _getResult(data) {
          let ret = []
          if(data.zhida && data.zhida.singerid) {
              ret.push({...data.zhida, ...{type: TYPE_SINGER}})
          }
          if(data.song) {
            ret = ret.concat(this._normalizeSongs(data.song.list))
          }
          return ret
      },
      _normalizeSongs(list) {
          let ret = []
          list.forEach(musicData => {
              if(musicData.songid && musicData.albummid) {
                  ret.push(createSong(musicData))
              }
          })
          return ret
      },
      _checkMore(data) {
          console.log(data, 'checkMore');
        //   const song = data.list
          if(!data.list.length || (data.pageNo * perpage) > data.total) {
              this.hasMore = false
          }
      },
      ...mapMutations({
          setSinger: 'SET_SINGER'
      }),
      ...mapActions([
          'insertSong'
      ])

  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixin.scss";

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        // no-wrap()
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
