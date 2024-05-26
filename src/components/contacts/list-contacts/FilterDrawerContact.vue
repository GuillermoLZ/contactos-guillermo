<template>
  <a-drawer
    :open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @close="handleClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <a-button @click="handleClose">
      Cerrar
    </a-button>
  </a-drawer>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits<{ "update:open": [open: boolean]; }>();

const handleClose = () => {
  emit("update:open", false);
}
</script>