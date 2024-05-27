<template>
  <h1 class="text-center">Datos personales</h1>
  <a-form
    ref="form"
    class="form_contact"
    :model="formContact"
    :rules="rules"
    @submit.prevent="handleNextStep"
  >
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item
          label="Nombres"
          name="first_name"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value="formContact.first_name"
            placeholder="Escribir nombres"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item
          label="Apellido paterno"
          name="paternal_surname"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value="formContact.paternal_surname"
            placeholder="Escribir apellido paterno"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Apellido materno"
          name="maternal_surname"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value="formContact.maternal_surname"
            placeholder="Escribir apellido materno"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item
          label="Tipo de documento"
          name="type_document"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-select
            style="width: 100%"
            v-model:value="formContact.type_document"
            :options="optionsDocuments"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="N° de documento"
          name="document_number"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value="formContact.document_number"
            placeholder="Escribir número de documento"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item
          label="Dirección"
          name="direction"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value="formContact.direction"
            placeholder="Escribir dirección"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Correo electrónico"
          name="email"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value="formContact.email"
            placeholder="Escribir correo electrónico"
          ></a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item
          label="Teléfono de contacto"
          name="phone"
          :label-col="{ span: 24, offset: 12 }"
        >
          <a-input
            v-model:value:value="formContact.phone"
            :addon-before="formContact.code_phone"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="section_details">
      <ExclamationCircleOutlined />
      Podrás agregar más de cada uno de estos datos después de crear el contacto
    </a-row>
    <div class="footer_actions">
      <a-button @click="handleCancel">Cancelar</a-button>
      <a-button type="primary" @click="handleNextStep">Continuar</a-button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  import { inject, ref, defineEmits } from 'vue'
  import { ContactForm } from '@/interfaces/contact'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

  const formContact = inject('formContact') as ContactForm

  const optionsDocuments = ref([{ value: 'DNI', label: 'DNI' }])

  const rules = {
    first_name: [{ required: true, message: 'Campo requerido' }],
    paternal_surname: [{ required: true, message: 'Campo requerido' }],
  }

  const form = ref()

  const emit = defineEmits<{ continue: []; cancel: [] }>()

  const handleCancel = () => {
    emit('cancel')
  }

  const handleNextStep = () => {
    form.value
      .validate()
      .then(() => {
        emit('continue')
      })
      .catch((error: any) => {
        console.log(error)
      })
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
