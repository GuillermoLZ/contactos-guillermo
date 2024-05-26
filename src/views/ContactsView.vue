<template>
  <div class="home">
    <FilterBasicContact />
    <TableContact />
  </div>
</template>

<script lang="ts" setup>
import TableContact from '@/components/contacts/list-contacts/TableContact.vue';
import FilterBasicContact from '@/components/contacts/list-contacts/FilterBasicContact.vue';
</script>