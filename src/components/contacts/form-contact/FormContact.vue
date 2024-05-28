<template>
  <a-modal
    progress-dot
    :open="open"
    title="Crear un nuevo contacto"
    :width="700"
    :footer="false"
    @cancel="closeModal"
  >
    <div style="padding: 10px 60px">
      <a-steps :current="currentStep" style="margin-top: 30px">
        <a-step title="Completar datos"></a-step>
        <a-step title="Asignar campaña"></a-step>
      </a-steps>

      <div v-show="currentStep === 0">
        <PersonalInformation @continue="nextStep" @cancel="closeModal" />
      </div>

      <div v-show="currentStep === 1">
        <CampaignAssign @previous="previousStep" @create="createContact" />
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
  import {
    ref,
    defineProps,
    defineEmits,
    provide,
    createVNode,
    watch,
  } from 'vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import PersonalInformation from '@/components/contacts/form-contact/PersonalInformation.vue'
  import CampaignAssign from '@/components/contacts/form-contact/CampaignAssign.vue'
  import { Modal, message } from 'ant-design-vue'
  import { useStore } from 'vuex'
  import { fetchCreateContact } from '@/services/Contact.service'
  import { ContactForm } from '@/interfaces/contact'

  const props = defineProps({
    open: Boolean,
  })

  const emit = defineEmits<{ 'update:open': [open: boolean] }>()
  const store = useStore()

  const currentStep = ref(0)

  const formContact = ref({
    first_name: '',
    paternal_surname: '',
    maternal_surname: '',
    type_document: 'DNI',
    document_number: '',
    direction: '',
    email: '',
    code_phone: '+51',
    phone: '',
  })

  provide('formContact', formContact)

  const nextStep = async () => {
    currentStep.value++
  }

  const previousStep = async () => {
    currentStep.value--
  }

  const createContact = async (portfolio: any) => {
    Modal.confirm({
      title: `¿Estás seguro de crear el contacto?`,
      content: `Se creará el contacto ${formContact.value.first_name} ${formContact.value.paternal_surname}`,
      icon: createVNode(ExclamationCircleOutlined),
      centered: true,
      okText: `Crear contacto`,
      onOk: async () => {
        try {
          const contact: ContactForm = {
            ...formContact.value,
            portfolio: portfolio,
          }
          const response = await fetchCreateContact(contact)
          console.log(response)
          if (response.status == 200) message.success('Se creó el contacto correctamente')
          closeModal()
          await store.dispatch('fetchContacts', { resetPagination: true })
        } catch (error) {
          message.error('Ocurrió un error al crear el contacto')
          console.log(error)
        }
      },
    })
  }

  const closeModal = () => {
    emit('update:open', false)
  }

  const clearModal = () => {
    currentStep.value = 0
    formContact.value = {
      first_name: '',
      paternal_surname: '',
      maternal_surname: '',
      type_document: 'DNI',
      document_number: '',
      direction: '',
      email: '',
      code_phone: '+51',
      phone: '',
    }
  }

  watch(
    () => props.open,
    () => {
      clearModal()
    }
  )
</script>

<style scoped>
  .footer-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
</style>
