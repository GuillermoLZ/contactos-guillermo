<template>
  <div class="filter">
    <a-input v-model:value="filtersBasic.search" placeholder="Buscar contacto">
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input>
    <a-select
      v-model:value="filtersBasic.entity"
      :options="optionsEntities"
      @change="handleChangeEntity"
    >
    </a-select>
    <a-select
      v-model:value="filtersBasic.portfolio"
      :disabled="!filtersBasic.entity"
      :options="optionsCampaigns"
      :loading="loadingCampaigns"
      @change="handleFilterContacts"
    >
    </a-select>
    <a-select v-model:value="filtersBasic.status" :options="optionsStatus">
    </a-select>
    <a-button @click="handleShowFilter">
      <FilterOutlined /> Filtros Avanzados
    </a-button>
  </div>
  <FilterDrawerContact v-model:open="showFilterDrawerContacts" />
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { SearchOutlined, FilterOutlined } from '@ant-design/icons-vue'
  import { useStore } from 'vuex'
  import { Contact } from '@/interfaces/contact'
  import { Select } from '@/interfaces/general'
  import FilterDrawerContact from './FilterDrawerContact.vue'

  const store = useStore()

  const showFilterDrawerContacts = ref(false)
  const filtersBasic = computed(() => store.getters.getFiltersBasic)

  const optionsEntities = ref<Select[]>([
    { value: '', label: 'Todas las empresas' },
    { value: 'QA EIRL', label: 'QA EIRL' },
    { value: 'Leña y Carbon', label: 'Leña y Carbon' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'ARGIE TEST', label: 'ARGIE TEST' },
  ])
  const optionsCampaigns = ref<Select[]>([
    { value: '', label: 'Todas las campañas' },
  ])
  const optionsStatus = ref<Select[]>([
    { value: '', label: 'Activos e Inactivos' },
    { value: true, label: 'Activos' },
    { value: false, label: 'Inactivos' },
  ])

  const loadingCampaigns = ref(false);

  const handleChangeEntity = async () => {
    loadingCampaigns.value = true;
    await store.dispatch('fetchContacts', { resetPagination: true })
    const contacts: Contact[] = store.getters.getContacts
    // Obtiene valores unicos de campañas del listado de contactos
    const uniqueSet = new Set<string>()
    filtersBasic.value.portfolio = '';
    for (const item of contacts) {
      let itemAux = {
        entity_name: item.entity_name,
        portfolio_name: item.portfolio_name,
        portfolio: item.portfolio,
      }
      if (!uniqueSet.has(JSON.stringify(itemAux))) {
        uniqueSet.add(JSON.stringify(itemAux))
      }
    }
    let options = Array.from(uniqueSet).map((itemString) =>
      JSON.parse(itemString)
    )

    // Filtro de campañas por entidad seleccionada
    options = await options.filter(
      (el) => el.entity_name == filtersBasic.value.entity
    )

    // Forma array con estructura de options para el select
    optionsCampaigns.value = [
      { value: '', label: 'Todas las campañas' },
      ...options.map((el) => ({
        value: el.portfolio,
        label: el.portfolio_name,
      })),
    ]
    loadingCampaigns.value = false;
  }

  const handleFilterContacts = async () => {
    await store.dispatch('fetchContacts', { resetPagination: true })
  }

  const handleShowFilter = () => {
    showFilterDrawerContacts.value = true
  }
</script>
<style scoped>
  .filter {
    display: flex;
    gap: 15px;
  }
  .filter .ant-input-affix-wrapper {
    width: 150px;
  }
  .filter .ant-select {
    width: 200px;
  }
</style>
