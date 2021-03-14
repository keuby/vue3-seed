<template>
  <div class="home">
    <div>{{ title }} -> {{ counter }}</div>
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"></HelloWorld>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from '@vue/reactivity'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  components: { HelloWorld },
  setup() {
    const title = ref('home title')
    const counter = ref(1)
    return { title, counter }
  }
})
</script>
