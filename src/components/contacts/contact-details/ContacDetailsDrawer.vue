<template>
  <a-drawer
    :open="open"
    class="custom-class"
    root-class-name="root-class-name"
    title="Detalles del contacto"
    placement="right"
    @close="handleClose"
    width="800"
  >
    <div>
      <a-row :gutter="16">
        <div class="contact-details">
          <a-avatar
            class="avatar"
            size="large"
            :style="{
              backgroundColor: '#f0f5ff',
              borderColor: '#85a5ff',
              color: '#1d39c4',
              verticalAlign: 'middle',
            }"
          >
            JW
          </a-avatar>
          <div class="name">
            <a-typography-text class="text-bold" :level="4">{{
              full_name
            }}</a-typography-text
            ><br />
            <a-typography-text type="secondary" class="centered-text">{{
              portfolio_name
            }}</a-typography-text>
          </div>
        </div>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-tabs v-model:activeKey="activeTabDrawer" type="card">
          <a-tab-pane key="1" tab="Personal" force-render>
            <a-tabs v-model:activeKey="activeTabPersonal">
              <a-tab-pane key="1" tab="Datos" force-render> </a-tab-pane>
              <a-tab-pane key="2" tab="Telefonos" force-render> </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Ticket"> </a-tab-pane>
        </a-tabs>
      </a-row>
      <a-row>
        <div v-if="activeTabDrawer == '1' && activeTabPersonal == '1'" class="table-container">
          <a-typography-text type="secondary">
            Puedes agregar o editar información acorde a los campos
            configurados. </a-typography-text
          ><br />
          <a-table
            :dataSource="transformedData"
            :columns="columns"
            :pagination="false"
            bordered
            show-header
          />
        </div>
        <a-table
          v-if="activeTabDrawer == '1' && activeTabPersonal == '2'"
          :scroll="{ y: 600 }"
          size="small"
          :dataSource="listPhones"
          :columns="columnsPhone"
        />
        <a-table
          v-if="activeTabDrawer == '2'"
          :scroll="{ y: 600 }"
          size="small"
          :dataSource="listTickets"
          :columns="columnsTickets"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'channel'">
              <div class="channels-img">
                <img :key="record.channel" :src="record.channel" />
              </div>
            </template>
          </template>
        </a-table>
      </a-row>
    </div>
    <template #footer>
      <div class="footer-buttons">
        <a-button type="link" danger @click="deleteContact"
          >Eliminar contacto</a-button
        >
        <div>
          <a-button style="margin-right: 8px">Ver anterior contacto</a-button>
          <a-button type="primary">Ver siguiente contacto</a-button>
        </div>
      </div>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
  import { message, Modal } from 'ant-design-vue'
  import { ref, watch, defineProps, defineEmits, createVNode } from 'vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

  const props = defineProps({
    open: Boolean,
    tabDefault: {
      type: String,
      default: 'Personal',
    },
  })

  const emit = defineEmits<{ 'update:open': [open: boolean] }>()

  const activeTabDrawer = ref('1')
  const activeTabPersonal = ref('1')
  const full_name = ref('Jenny Wilson Kong')
  const portfolio_name = ref('Campaña: Ventas 2024 navidad ')

  const listPhones = ref([
    {
      key: '1',
      code: '+51',
      phone: '992839281',
      typePhone: 'Celular',
      origin: 'Personal',
      operatorPhone: 'Movistar',
      priority: '1',
      observation: 'Este número solo resp de 6pm a 11pm',
    },
    {
      key: '3',
      code: '+51',
      phone: '992839281',
      typePhone: 'Celular',
      origin: '-',
      operatorPhone: 'Claro',
      priority: '1',
      observation: 'Este número solo resp de 6pm a 11pm',
    },
    {
      key: '3',
      code: '+51',
      phone: '992839281',
      typePhone: '-',
      origin: 'Personal',
      operatorPhone: '-',
      priority: '1',
      observation: 'Este número solo resp de 6pm a 11pm',
    },
    {
      key: '4',
      code: '+51',
      phone: '992839281',
      typePhone: 'Celular',
      origin: 'Personal',
      operatorPhone: 'Entel',
      priority: '2',
      observation: 'Este número solo resp de 6pm a 11pm',
    },
  ])

  const columnsPhone = ref([
    {
      title: 'Código del país',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: 'Número',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: 'Tipo de teléfono',
      dataIndex: 'typePhone',
      key: 'typePhone',
      width: 150,
    },
    {
      title: 'Origen',
      dataIndex: 'origin',
      key: 'origin',
      width: 100,
    },
    {
      title: 'Operador telefónico',
      dataIndex: 'operatorPhone',
      key: 'operatorPhone',
      width: 150,
    },
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
    },
    {
      title: 'Observación',
      dataIndex: 'observation',
      key: 'observation',
      width: 300,
    },
  ])

  const listTickets = ref([
    {
      key: '1',
      date: '24/05/2024 10:04:23',
      channel:
        'http://scorev2bucket.obs.sa-peru-1.myhuaweicloud.com/channels/voice.png',
      identificator: '-',
      phone: '5198765454',
      user: 'Carmen Rosa Gutierrez',
      group: 'Contacto Directo',
      result: 'Promesa de pago',
      motive: 'En 24 horas',
      submotive: '-',
      comment: 'Contestó y se comp...',
    },
    {
      key: '2',
      date: '24/05/2024 10:04:23',
      channel:
        'http://scorev2bucket.obs.sa-peru-1.myhuaweicloud.com/channels/voice.png',
      identificator: 'Roma Seguros',
      phone: '-',
      user: 'Fernando Timaná JK',
      group: 'Contacto Directo',
      result: 'Promesa de pago',
      motive: 'En 24 horas',
      submotive: '-',
      comment: 'Contestó y se comp...',
    },
    {
      key: '3',
      date: '24/05/2024 10:04:23',
      channel:
        'http://scorev2bucket.obs.sa-peru-1.myhuaweicloud.com/channels/voice.png',
      identificator: 'Roma Seguros',
      phone: '+51936787344',
      user: 'Carmen Rosa Gutierrez',
      group: 'Contacto Directo',
      result: 'Promesa de pago',
      motive: 'En 24 horas',
      submotive: '-',
      comment: 'Contestó y se comp...',
    },
  ])

  const columnsTickets = ref([
    {
      title: 'Fecha y hora',
      dataIndex: 'date',
      key: 'date',
      width: 160,
    },
    {
      title: 'Canal',
      dataIndex: 'channel',
      key: 'channel',
      width: 100,
    },
    {
      title: 'Identificador',
      dataIndex: 'identificator',
      key: 'identificator',
      width: 150,
    },
    {
      title: 'Telefono del contacto',
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
    },
    {
      title: 'Usuario que gestionó',
      dataIndex: 'user',
      key: 'user',
      width: 160,
    },
    {
      title: 'Grupo',
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: 'Resultado',
      dataIndex: 'result',
      key: 'result',
      width: 130,
    },
    {
      title: 'Motivo',
      dataIndex: 'motive',
      key: 'motive',
      width: 130,
    },
    {
      title: 'Submotivo',
      dataIndex: 'submotive',
      key: 'submotive',
      width: 130,
    },
    {
      title: 'Comentario',
      dataIndex: 'comment',
      key: 'comment',
      width: 160,
    },
  ])

  
// Datos originales de ejemplo
const originalData = [
  { key: '1', Código_de_contacto: '001',Nombre: 'John Brown', Apellido_paterno: 'John Brown', Apellido_materno: 'John Brown',N_de_documento: '76600922',Fecha_de_nacimiento: '22/06/1996', Edad: 28, Sexo: 'Femenino', Estado_civil: 'Soltero',País: 'Perú',Ciudad: 'Lima' }
];

// Encabezados originales
const headers = ['Nombre','Código_de_contacto', 'Apellido_paterno', 'Apellido_materno', 'N_de_documento','Fecha_de_nacimiento','Edad', 'Sexo','Estado_civil','País','Ciudad'];

// Transformar los datos para la tabla vertical
const transformedData = ref(
  headers.map((header, index) => ({
    key: index,
    header: header.replace(/_/g, ' '),
    ...originalData.reduce((acc, row) => {
      acc[row.key] = row[header];
      return acc;
    }, {})
  }))
);

const columns = [
  {
    title: '',
    dataIndex: 'header',
    key: 'header',
    width: '50%',
    customRender: ({ text }) => ({
      children: text,
      attrs: { colSpan: 1 },
    }),
  },
  ...originalData.map(row => ({
    title: ``,
    dataIndex: row.key,
    key: row.key,
    customRender: ({ text }) => ({
      children: text,
      attrs: { colSpan: 1 },
    }),
  }))
];
  const handleClose = () => {
    emit('update:open', false)
  }

  const deleteContact = () => {
    Modal.confirm({
      title: `¿Estás seguro de eliminar el contacto ${full_name.value}?`,
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

  watch(
    () => props.tabDefault,
    (v: string) => {
      if (v == 'Personal') {
        activeTabDrawer.value = '1'
        activeTabPersonal.value = '1'
      } else if (v == 'Phone') {
        activeTabDrawer.value = '1'
        activeTabPersonal.value = '2'
      }
    }
  )
</script>

<style scoped>
  .contact-details {
    display: flex;
    gap: 10px;
  }
  .text-bold {
    font-weight: bold;
  }
  .footer-buttons {
    display: flex;
    justify-content: space-between;
  }
  .channels-img {
    display: flex;
    font-size: 10px;
  }
  .channels-img img {
    width: 20px;
  }

  .table-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  }
</style>
