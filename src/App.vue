<script>
import { defineComponent } from 'vue';
import createScreen from './createScreen.js'
// import createLine from './createLine.js'
// import createText from './geometryText.js'

export default defineComponent({
  name: 'app',
  methods: {
    handleBack() {
      // this.$router.back();
    },
  },
  mounted() {
    const content = document.body.getElementsByTagName('canvas')
    if (content.length) {
      document.body.removeChild(content[0]);
    }
    // 创建场景
    createScreen();
    // 画线
    // createLine();
    // 创建文字
    // createText();
  }
})
</script>

<template>
  <div>
    <!-- <div class="header" @click="handleBack"></div> -->
  </div>
</template>

<style scoped lang="less">
.header {
  width: 100%;
}
</style>
