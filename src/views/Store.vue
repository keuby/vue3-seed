<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>token: {{ user.bearerToken }}</p>
    <div>
      set token:
      <input v-model="inputValue" type="text" />
    </div>
    <div v-if="loading">loading</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script lang="ts">
import { useRequest } from 'vue-request'
import { useTokenStore } from '@/store'
import { defineComponent, ref, watch } from '@vue/runtime-core'
import { useHttpClient } from '@/plugins/http'

export default defineComponent({
  setup() {
    const user = useTokenStore()
    const inputValue = ref('')

    const http = useHttpClient()
    const { data, loading, refresh } = useRequest(() => http.get('/typicode/demo/db'))

    watch(
      () => inputValue.value,
      () => inputValue.value === 'reload' && refresh()
    )
    return { user, data, inputValue, loading }
  },
})
</script>
