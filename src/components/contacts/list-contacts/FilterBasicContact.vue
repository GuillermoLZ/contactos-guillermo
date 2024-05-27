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
  import { computed, watch, ref } from 'vue'
  import { SearchOutlined, FilterOutlined } from '@ant-design/icons-vue'
  import { useStore } from 'vuex'
  import { Contact } from '@/interfaces/contact'
  import { Select } from '@/interfaces/general'
  import FilterDrawerContact from './FilterDrawerContact.vue'

  const store = useStore()

  const showFilterDrawerContacts = ref(false)
  const filtersBasic = computed(() => store.getters.getFiltersBasic)

  const optionsEntities = ref<Select[]>([])
  const optionsCampaigns = ref<Select[]>([])
  const optionsStatus = ref<Select[]>([
    { value: '', label: 'Activos e Inactivos' },
    { value: true, label: 'Activos' },
    { value: false, label: 'Inactivos' },
  ])

  const getEntities = (contacts: Contact[]) => {
    let options: string[] = []
    options = [...new Set(contacts.map((el: Contact) => el.entity_name))]
    optionsEntities.value = [
      { value: '', label: 'Todas las empresas' },
      ...options.map((el) => ({ value: el, label: el })),
    ]
  }

  const handleChangeEntity = async () => {
    const contacts: Contact[] = store.getters.getContacts
    // Obtiene valores unicos de campañas del listado de contactos
    const uniqueSet = new Set<string>()

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
    options = options.filter(
      (el) => el.entity_name == filtersBasic.value.entity
    )
    console.log(options)

    // Forma array con estructura de options para el select
    optionsCampaigns.value = [
      { value: '', label: 'Todas las campañas' },
      ...options.map((el) => ({
        value: el.portfolio,
        label: el.portfolio_name,
      })),
    ]
    await store.dispatch('fetchContacts', { resetPagination: true })
  }

  const handleFilterContacts = async () => {
    await store.dispatch('fetchContacts', { resetPagination: true })
  }

  const handleShowFilter = () => {
    showFilterDrawerContacts.value = true
  }

  watch(
    () => store.getters.getContacts,
    (newValue) => {
      getEntities(newValue)
    }
  )
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
