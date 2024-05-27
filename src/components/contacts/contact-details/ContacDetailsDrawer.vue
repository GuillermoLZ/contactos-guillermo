<template>
  <a-drawer
    :open="open"
    class="custom-class"
    root-class-name="root-class-name"
    title="Detalles del contacto"
    placement="right"
    @close="handleClose"
    width="480"
  >
    <br />
    <br />
  </a-drawer>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useStore } from 'vuex'

  const props = defineProps({
    open: Boolean,
  })
  const store = useStore()
</script>
