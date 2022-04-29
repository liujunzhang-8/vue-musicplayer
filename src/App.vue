<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <!-- 缓存Dom -->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
export default {
  name: 'App',
  components: {
      MHeader,
      Tab,
  }
}
</script>

<style lang="scss" scoped>
</style>
