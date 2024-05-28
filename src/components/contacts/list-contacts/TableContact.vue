<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :scroll="{ y: 400 }"
    :pagination="pagination"
    @change="changePage"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'code'">
        {{ record.code }}
      </template>
      <template v-if="column.key === 'full_name'">
        <a @click="handleShowDetailsContact('Personal')">
          {{ record.full_name }}
        </a>
      </template>
      <template v-if="column.key === 'phones'">
        <a @click="handleShowDetailsContact('Phone')">
          {{ countPhones(record.phones) }}
        </a>
      </template>
      <!-- falta devolver numero en la api para mostrar el popover de figma por cada channel -->
      <template v-else-if="column.key === 'channels'">
        <div class="channels-img">
          <img
            v-for="channel in record.channels"
            :key="channel.id"
            :src="channel.icon"
          />
        </div>
      </template>
      <template v-else-if="column.key === 'best_management_result_month'">
        <p>{{ record.best_management_result_month?.result_name }}</p>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-switch v-model:checked="record.active" size="small" />
          <a-button type="link" @click="deleteContact(record)"><DeleteOutlined /></a-button>
        </span>
      </template>
    </template>
  </a-table>
  <ContactDetailsDrawer v-model:open="showContactDetailsDrawer" :tabDefault="tabDefault" />
</template>
<script lang="ts" setup>
  import { DeleteOutlined } from '@ant-design/icons-vue'
  import { onMounted, ref, computed, createVNode } from 'vue'
  import { Pagination } from '@/interfaces/general'
  import { useStore } from 'vuex'
  import { Contact } from '@/interfaces/contact';
  import { Modal, message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import ContactDetailsDrawer from '@/components/contacts/contact-details/ContacDetailsDrawer.vue'

  const store = useStore()

  const columns = [
    {
      title: 'Cod Conctacto',
      dataIndex: 'code',
      key: 'code',
      width: '150px',
    },
    {
      title: 'Nombres y Apellidos',
      dataIndex: 'full_name',
      key: 'full_name',
      width: '250px',
    },
    {
      title: 'Empresa',
      dataIndex: 'entity_name',
      key: 'entity_name',
      width: '160px',
    },
    {
      title: 'Campaña',
      dataIndex: 'portfolio_name',
      key: 'portfolio_name',
      width: '200px',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phones',
      key: 'phones',
      width: '120px',
    },
    {
      title: 'Número de Documento',
      dataIndex: 'document_number',
      key: 'document_number',
      width: '200px',
    },
    {
      title: 'Canales',
      dataIndex: 'channels',
      key: 'channels',
      width: '200px',
    },
    {
      title: 'Colas',
      dataIndex: 'queues',
      key: 'queues',
      width: '200px',
    },
    {
      title: 'Fecha de última gestión',
      dataIndex: 'last_management_date',
      key: 'last_management_date',
      width: '200px',
    },
    {
      title: 'Fecha de última interacción',
      dataIndex: 'last_interaction_date',
      key: 'last_interaction_date',
      width: '200px',
    },
    {
      title: 'Último grupo',
      dataIndex: 'best_management_group_month',
      key: 'best_management_group_month',
      width: '200px',
    },
    {
      title: 'Último resultado',
      dataIndex: 'best_management_result_month',
      key: 'best_management_result_month',
      width: '200px',
    },
    {
      title: 'Último motivo',
      dataIndex: 'best_management_motive_month',
      key: 'best_management_motive_month',
      width: '200px',
    },
    {
      title: 'Último submotivo',
      dataIndex: 'best_management_submotive_month',
      key: 'best_management_submotive_month',
      width: '200px',
    },
    {
      title: 'Último vez gestionado por:',
      dataIndex: 'last_management_user',
      key: 'last_management_user',
      width: '200px',
    },
    {
      title: 'Usuario asignado',
      dataIndex: 'user_assigned',
      key: 'user_assigned',
      width: '200px',
    },
    {
      title: 'Fecha de creacion',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '200px',
    },
    {
      title: 'Fecha de última actualización',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '200px',
    },
    {
      title: 'Acciones',
      key: 'action',
      fixed: 'right',
      width: '120px',
    },
  ]

  const tabDefault = ref<string>('Personal');

  const data = computed(() => store.getters.getContacts)
  const pagination = computed(() => store.getters.getPagination)
  const loading = ref(false)
  const showContactDetailsDrawer = ref(false)

  const countPhones = (phones: string[]) => {
    const count = phones.length
    return count + ' ' + (count > 1 ? 'teléfonos' : 'teléfono')
  }

  const listContacts = async () => {
    loading.value = true
    await store.dispatch('fetchContacts', { resetPagination: false })
    loading.value = false
  }

  const changePage = async (value: Pagination) => {
    store.commit('setPagination', value)
    await listContacts()
  }

  const deleteContact = (record: Contact) => {
    Modal.confirm({
      title: `¿Estás seguro de eliminar el contacto ${record.full_name}?`,
      content: `Recuerda que ya no se visualizará este contacto en la tabla. Si deseas volver a visualizarlo, deberás agregarlo nuevamente a Score.`,
      icon: createVNode(ExclamationCircleOutlined),
      centered: true,
      okText: `Aceptar`,
      cancelText: `Cancelar`,
      onOk: async () => {
        message.success('Se ha eliminado correctamente')
      },
    })
  }

  const handleShowDetailsContact = (tab) => {
    showContactDetailsDrawer.value = true
    tabDefault.value = tab
  }

  onMounted(async () => {
    await listContacts()
  })
</script>

<style scoped>
  .channels-img {
    display: flex;
  }

  .channels-img img {
    width: 20px;
  }
</style>
