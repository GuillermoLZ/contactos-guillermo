<template>
  <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="custom-menu">
    <a-menu-item
      v-for="item in items"
      :key="item.key"
      :style="{ paddingInline: 'calc(50% - 16px)' }"
    >
      <router-link :to="item.link">
        <span><component :is="item.icon" style="font-size: 25px" /></span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  defineProps({
    items: {
      type: Array as () => Array<any>,
      default: () => [],
    },
  })
</script>

<style scoped>
  .anticon {
    font-size: 25px;
  }
  .custom-menu {
    border-inline-end: none;
    padding: 0px 6px;
    margin-top: 10px;
  }
</style>
