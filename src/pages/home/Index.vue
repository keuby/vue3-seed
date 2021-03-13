<template>
  <div class="goods">
    <van-swipe
      class="goods-swipe"
      :autoplay="3000"
    >
      <van-swipe-item
        v-for="thumb in goods.thumb"
        :key="thumb"
      >
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell
        value="进入店铺"
        icon="shop-o"
        is-link
        @click="sorry"
      >
        <template #title>
          <span class="van-cell-text">有赞的店</span>
          <van-tag
            class="goods-tag"
            type="danger"
          >官方</van-tag>
        </template>
      </van-cell>
      <van-cell
        title="线下门店"
        icon="location-o"
        is-link
        @click="sorry"
      />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell
        title="查看商品详情"
        is-link
        @click="sorry"
      />
    </van-cell-group>

    <van-action-bar>
      <van-action-bar-icon
        icon="chat-o"
        @click="sorry"
      >
        客服
      </van-action-bar-icon>
      <van-action-bar-icon
        icon="cart-o"
        @click="onClickCart"
      >
        购物车
      </van-action-bar-icon>
      <van-action-bar-button
        type="warning"
        @click="sorry"
      >
        加入购物车
      </van-action-bar-button>
      <van-action-bar-button
        type="danger"
        @click="sorry"
      >
        立即购买
      </van-action-bar-button>
    </van-action-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/runtime-core'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  ActionBar,
  ActionBarIcon,
  ActionBarButton
} from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ActionBar.name]: ActionBar,
    [ActionBarIcon.name]: ActionBarIcon,
    [ActionBarButton.name]: ActionBarButton
  },
  setup() {
    const goods = reactive({
      title: '美国伽力果（约680g/3个）',
      price: 2680,
      express: '免运费',
      remain: 19,
      thumb: [
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
      ]
    })
    const router = useRouter()

    return {
      goods,
      sorry: () => Toast('暂无后续逻辑~'),
      formatPrice: (price: number) => '¥' + (price / 100).toFixed(2),
      onClickCart: () => router.push('cart')
    }
  }
})
</script>

<style lang="less" src="./index.less" scoped></style>
