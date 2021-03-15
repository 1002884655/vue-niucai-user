<template>
  <div class="components Banner">
    <swiper :options="SwiperOptions" ref="MySwiper">
      <swiper-slide v-for="(item, index) in list" :key="index">
        <div class="SwiperItem" @click="$emit('Click', item)">
          <img :src="item.image" class="centerLabel cover" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
/*
  页面名称：
*/
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapIndexState } = createNamespacedHelpers('index')
export default {
  name: 'Banner',
  props: {
    list: { // 列表数据
      default: () => {
        return []
      },
      type: Array
    }
  },
  data () {
    return {
      SwiperOptions: {
        effect: 'coverflow',
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -10,
          depth: 0,
          modifier: 2,
          slideShadows: false
        }
      }
    }
  },
  computed: {
    ...mapIndexState({
      Banner: x => x.Banner // banner列表
    }),
    MySwiper () {
      return this.$refs.MySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
