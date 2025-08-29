<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import BScroll from 'better-scroll'

interface Props {
  /**
   * 1 滚动的时候会派发scroll事件，会截流。
   * 2 滚动的时候实时派发scroll事件，不会截流。
   * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
   */
  probeType?: number;
  // 点击列表是否派发click事件
  click?: boolean;
  // 是否开启横向滚动
  scrollX?: boolean;
  // 是否派发滚动事件
  listenScroll?: boolean;
  // 列表的数据
  scrollData?: any[];
  // 是否派发滚动到底部的事件，用于上拉加载
  pullup?: boolean;
  // 是否派发顶部下拉的事件，用于下拉刷新
  pulldown?: boolean;
  // 是否派发列表滚动开始的事件
  beforeScroll?: boolean;
  // 当数据更新后，刷新scroll的延时
  refreshDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  probeType: 1,
  click: true,
  scrollX: false,
  listenScroll: false,
  scrollData: () => [],
  pullup: false,
  pulldown: false,
  beforeScroll: false,
  refreshDelay: 20
})

const emit = defineEmits<{
  scroll: [position: any];
  scrollToEnd: [];
  pulldown: [];
  beforeScroll: [];
}>()

const wrapper = ref<HTMLElement>()
let scroll: BScroll | null = null

// 初始化滚动组件
const initScroll = () => {
  if (!wrapper.value) {
    return
  }
  // better-scroll 初始化， 传入配置项参数
  scroll = new BScroll(wrapper.value, {
    probeType: props.probeType,
    click: props.click,
    scrollX: props.scrollX
  })
  
  // 是否派发滚动事件
  if (props.listenScroll) {
    scroll.on('scroll', (position: any) => {
      emit('scroll', position)
    })
  }
  
  if (props.pullup) {
    scroll.on('scrollEnd', () => {
      // 滚动到底部
      if (scroll && scroll.y <= (scroll.maxScrollY + 50)) {
        // 派发滚动到底部的事件
        emit('scrollToEnd')
      }
    })
  }
  
  if (props.pulldown) {
    scroll.on('touchend', (pos: any) => {
      // 下拉动作
      if (pos.y > 50) {
        // 下拉刷新
        emit('pulldown')
      }
    })
  }
  
  if (props.beforeScroll) {
    scroll.on('beforeScrollStart', () => {
      // 列表滚动前触发
      emit('beforeScroll')
    })
  }
}

const disable = () => {
  // 代理 better-scroll 的 disable 方法
  scroll && scroll.disable()
}

const enable = () => {
  // 代理 better-scroll 的 enable 方法
  scroll && scroll.enable()
}

const refresh = () => {
  // 代理 better-scroll 的 refresh 方法
  scroll && scroll.refresh()
}

const scrollTo = (...args: any[]) => {
  // 代理 better-scroll 的 scrollTo 方法
  scroll && scroll.scrollTo.apply(scroll, args)
}

const scrollToElement = (...args: any[]) => {
  // 代理 better-scroll 的 scrollToElement 方法
  scroll && scroll.scrollToElement.apply(scroll, args)
}

// 暴露方法给父组件
defineExpose({
  disable,
  enable,
  refresh,
  scrollTo,
  scrollToElement
})

onMounted(() => {
  // 在 DOM 渲染完毕后初始化 better-scroll，大致做一个 20 毫秒的等待，确保 DOM 渲染完毕
  setTimeout(() => {
    initScroll()
  }, 20)
})

// 监听数据的变化，重新计算高度
watch(() => props.scrollData, () => {
  nextTick(() => {
    setTimeout(() => {
      refresh()
    }, props.refreshDelay)
  })
}, { deep: true })
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>