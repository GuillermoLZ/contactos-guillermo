<template>
  <h1 class="text-center">Selecciona Camapaña</h1>
  <a-row :gutter="16">
    <a-col :span="24">
      Selecciona la campaña donde quieres crear este nuevo contacto.
    </a-col>
  </a-row>
  <a-row :gutter="16">
    <a-col :span="24">
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'actions'">
            <a @click="saveContact(record.portfolio)">Crear contacto aquí</a>
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>
  <div class="footer_actions">
    <a-button @click="handlePreviousStep">Volver</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits } from 'vue'

  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'entity_name',
      key: 'entity_name',
      width: 200,
    },
    {
      title: 'Campaña',
      dataIndex: 'portfolio_name',
      key: 'portfolio_name',
      width: 200,
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
    },
  ]

  const data = [
    {
      key: '1',
      entity_name: 'Blanco Global',
      portfolio_name: 'Campaña ventas',
      portfolio: 97,
    },
    {
      key: '1',
      entity_name: 'Blanco Global',
      portfolio_name: 'Campaña atc',
      portfolio: 97,
    },
    {
      key: '1',
      entity_name: 'Blanco Global',
      portfolio_name: 'Campaña reclamos',
      portfolio: 97,
    },
  ]

  const emit = defineEmits<{ previous: []; create: [portfolio: number] }>()

  const handlePreviousStep = () => {
    emit('previous')
  }

  const saveContact = (portfolio: number) => {
    emit('create', portfolio)
  }
</script>

<style>
  .text-center {
    text-align: center;
  }
  .ant-form-item-label {
    padding-bottom: 0 !important;
  }
  .section_details {
    padding: 0 10px;
    align-items: center;
    gap: 10px;
  }
  .footer_actions {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
</style>
