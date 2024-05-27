<template>
  <div class="home">
    <FilterBasicContactDescription />
    <div class="flex">
      <FilterBasicContact />
      <a-button
        class="btn-create"
        ghost
        type="primary"
        @click="handleCreateContact"
      >
        Crear Contacto
        <PlusOutlined />
      </a-button>
    </div>
    <TableContact />
    <FormContact v-model:open="openCreateContact" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import TableContact from '@/components/contacts/list-contacts/TableContact.vue'
  import FilterBasicContactDescription from '@/components/contacts/list-contacts/FilterBasicContactDescription.vue'
  import FilterBasicContact from '@/components/contacts/list-contacts/FilterBasicContact.vue'
  import FormContact from '@/components/contacts/form-contact/FormContact.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'

  const openCreateContact = ref(false)

  const handleCreateContact = () => {
    openCreateContact.value = true
  }
</script>

<style scoped>
  .flex {
    display: flex;
    justify-content: space-between;
  }
</style>
