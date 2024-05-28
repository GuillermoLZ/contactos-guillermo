<template>
  <a-drawer
    :open="open"
    class="custom-class"
    root-class-name="root-class-name"
    title="Selecciona tus filtros por gestión"
    placement="right"
    @close="handleClose"
    width="480"
  >
    <div v-if="filtersBasic.portfolio != ''">
      <p>
        Filtra tus contactos en base a sus gestiones realizadas. No olvides
        aplicar tus filtros para que se visualizen en la tabla.
      </p>
      <a-typography-text strong>Tipificaciones:</a-typography-text>
      <br /><br />Con gestiones realizadas<br />
      <a-select
        v-model:value="filtersAdvance.managent"
        :options="optionsManagment"
        class="select"
      ></a-select>
      <br /><br />Grupos<br />
      <a-select
        mode="tags"
        v-model:value="filtersAdvance.group"
        :options="optionsGroup"
        placeholder="Seleccionar grupos"
        class="select"
        :disabled="!filtersAdvance.managent"
      ></a-select>
      <br /><br />Resultado<br />
      <a-select
        mode="tags"
        v-model:value="filtersAdvance.result"
        :options="optionsResult"
        placeholder="Seleccionar resultados"
        class="select"
        :disabled="!filtersAdvance.managent"
      ></a-select>
      <br />
      <br />
      Fecha de última gestión
      <br />
      <div class="date">
        <div>
          Desde<br />
          <a-date-picker
            v-model:value="filtersAdvance.dateinit"
            :format="dateFormat"
            :disabled="!filtersAdvance.managent"
          />
        </div>
        <div>
          Hasta<br />
          <a-date-picker
            v-model:value="filtersAdvance.dateend"
            :format="dateFormat"
            :disabled="!filtersAdvance.managent"
          />
        </div>
      </div>
      <a-typography-text strong>Asignación de contactos:</a-typography-text>
      <br />Tipo de vista<br />
      <a-select
        v-model:value="filtersAdvance.typeview"
        :options="optionsTypeofView"
        class="select"
        :disabled="!filtersAdvance.managent"
      ></a-select>
      <br />
      <a-typography-text strong>Última vez gestionado por:</a-typography-text>
      <div class="date">
        <div>
          Usuarios
          <br />
        </div>
        <div>
          Seleccionados
          <br />
        </div>
      </div>

      <a-transfer
        v-model:target-keys="filtersAdvance.users"
        v-model:selected-keys="selectedUsersTree"
        class="tree-transfer"
        :data-source="usersDataSource"
        :render="(item) => item.title"
        :show-select-all="false"
      >
        <template #children="{ direction, selectedKeys, onItemSelect }">
          <a-tree
            v-if="direction === 'left'"
            block-node
            checkable
            check-strictly
            default-expand-all
            v-model:selectedKeys="selectedUsersTree"
            :checked-keys="[...selectedKeys, ...filtersAdvance.users]"
            :tree-data="treeUserData"
            @check="
              (_, props) => {
                onChecked(
                  props,
                  [...selectedKeys, ...filtersAdvance.users],
                  onItemSelect
                )
              }
            "
            @select="
              (_, props) => {
                onChecked(
                  props,
                  [...selectedKeys, ...filtersAdvance.users],
                  onItemSelect
                )
              }
            "
          >
            <template #title="{ title, children }">
              <span :style="children?.length > 0 ? 'font-weight: bold' : ''">{{
                title
              }}</span>
            </template>
          </a-tree>
        </template>
      </a-transfer>
    </div>
    <div class="not-filters-advanced" v-else>
      <span class="title"
        >Filtra tus contactos en base a su empresa y campaña.</span
      >
      <div class="content">
        <div class="centered-content">
          <img src="~@/assets/img-filter.png" alt="Imagen" />
          <a-typography-text type="secondary" class="centered-text">
            Debes seleccionar una sola empresa y campaña para utilizar esta
            opción.
          </a-typography-text>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="footer">
        <a-button
          style="margin-right: 8px"
          @click="handleClear"
          :disabled="filtersBasic.portfolio == ''"
          >Limpiar</a-button
        >
        <a-button
          type="primary"
          @click="handleFilter"
          :disabled="filtersBasic.portfolio == ''"
          >Aplicar</a-button
        >
      </div>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits, computed, ref, watch } from 'vue'
  import type { TransferProps, TreeProps } from 'ant-design-vue'
  import { useStore } from 'vuex'
  import { Select } from '@/interfaces/general'
  import { Key } from 'ant-design-vue/es/_util/type'

  defineProps({
    open: Boolean,
  })

  const dateFormat = 'YYYY-MM-DD'

  const store = useStore()
  const filtersAdvance = computed(() => store.getters.getFiltersAdvance)
  const filtersBasic = computed(() => store.getters.getFiltersBasic)
  const emit = defineEmits<{ 'update:open': [open: boolean] }>()

  const handleClose = () => {
    emit('update:open', false)
  }
  const optionsManagment = ref<Select[]>([
    { value: '', label: 'Gestiondos y sin gestionar' },
    { value: true, label: 'Gestionados' },
    { value: false, label: 'Sin gestionar' },
  ])

  const optionsGroup = ref<Select[]>([
    { value: 0, label: 'Grupo Anchor' },
    { value: 1, label: 'Grupo Benefit' },
    { value: 2, label: 'Grupo AGV' },
  ])

  const optionsResult = ref<Select[]>([
    { value: 0, label: 'Resultado Anchor' },
    { value: 1, label: 'Resultado Benefit' },
    { value: 2, label: 'Resultado AGV' },
  ])
  const optionsTypeofView = ref<Select[]>([
    { value: '', label: 'Contactos asignados y no asignados' },
    { value: 1, label: 'Constactos no asignados' },
    { value: 2, label: 'Contactos asignados' },
  ])

  const selectedUsersTree = ref([])

  const handleClear = () => {
    console.log('handle clrear')
    selectedUsersTree.value = [].map((el) => el)
    store.commit('resetFilterAdvance')
  }

  const treeUsers: TransferProps['dataSource'] = [
    {
      key: '0',
      title: 'Teleoperador',
      children: [
        { key: '0-0', title: 'Julio Machachay' },
        { key: '0-1', title: 'Fernando Rios Brio' },
        { key: '0-2', title: 'Guillermo Lopez Abanto' },
      ],
      style: '',
    },
    {
      key: '1',
      title: 'Agente Virtual',
      children: [{ key: '1-1', title: 'Fernando Rios Brio' }],
      style: '',
    },
  ]

  const transferUsersDataSource: TransferProps['dataSource'] = []

  const flatten = (list: TransferProps['dataSource'] = []) => {
    list.forEach((item) => {
      transferUsersDataSource.push(item)
      flatten(item.children)
    })
  }
  flatten(treeUsers)

  const isChecked = (
    selectedKeys: (string | number)[],
    eventKey: Key | undefined
  ) => {
    return selectedKeys.indexOf(eventKey) !== -1
  }

  const handleTreeData = (
    treeNodes: TransferProps['dataSource'],
    targetKeys: string[] = []
  ) => {
    return treeNodes?.map(({ children, ...props }) => ({
      ...props,
      disabled: targetKeys.includes(props.key as string),
      children: handleTreeData(children ?? [], targetKeys),
    }))
  }

  const usersDataSource = ref(transferUsersDataSource)

  const treeUserData = computed(() => {
    return handleTreeData(treeUsers, filtersAdvance.value.users)
  })

  const onChecked = (
    e:
      | Parameters<TreeProps['onCheck']>[1]
      | Parameters<TreeProps['onSelect']>[1],
    checkedKeys: string[],
    onItemSelect: (n: any, c: boolean) => void
  ) => {
    const { eventKey } = e.node
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey))
  }

  const handleFilter = async () => {
    await store.dispatch('fetchContacts', {
      resetPagination: true,
      filtersAdvance: true,
    })
    handleClose();
  }

  watch(
    () => store.getters.getFiltersAdvance,
    (newValue) => {
      if (newValue.users.length == 0) {
        selectedUsersTree.value = []
      }
    }
  )
</script>
<style scoped>
  .date {
    display: flex;
    justify-content: space-between;
  }
  .tree-transfer .ant-transfer-list:first-child {
    width: 50%;
    flex: none;
  }
  .select {
    width: 100%;
  }
  .footer {
    display: flex;
    justify-content: end;
  }
  .not-filters-advanced {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .not-filters-advanced img {
    width: 119px;
  }
  .not-filters-advanced .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 200px);
  }

  .not-filters-advanced .centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
