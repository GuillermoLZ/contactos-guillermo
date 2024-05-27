<template>
  <div class="filter-description">
    <div>
      <span
        >Gestiona los contactos de tus campañas. Puedes ver, editar información
        y realizar acciones individuales como llamadas.
      </span>
      <a-typography-link href="https://antdv.com" target="_blank">
        Click aquí
      </a-typography-link>
      <span> para conocer más.</span>
    </div>
    <div>
      <span style="font-size: bold">Contactos encontrados: </span>
      <span>{{ pagination.total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const pagination = computed(() => store.getters.getPagination)
</script>
<style scoped>
  .filter-description {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
</style>
