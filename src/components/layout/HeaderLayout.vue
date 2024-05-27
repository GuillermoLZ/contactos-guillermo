<template>
  <a-layout-header
    :style="{
      background: '#fff',
      padding: '0 22px',
      borderBottom: '2px solid #dedede',
    }"
  >
    <a-flex
      :justify="'space-between'"
      :align="'center'"
      :style="{ width: '100%' }"
    >
      <div :style="{ display: 'flex', height: '50px', alignItems: 'center' }">
        <h2>Contactos</h2>
        <info-circle-outlined :style="{ marginLeft: '10px' }" />
        <a-alert
          message="Webphone conectado"
          type="success"
          :style="{
            background: '#f6ffed',
            borderColor: '#b7eb8f',
            color: '#52c41a',
            padding: '1px 8px',
            fontSize: '12px',
            borderRadius: '2px',
            marginLeft: '10px',
          }"
        />
      </div>
      <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
        <GlobalOutlined />
        <span :style="{ marginLeft: '10px' }"
          >Hora plataforma 20:49 (GMT-5) Perú</span
        >
        <a-divider type="vertical" class="divider-header" />
        <phone-outlined class="icon_long" />
        <a-divider type="vertical" class="divider-header" />
        <bell-outlined class="icon_long" />
        <a-divider type="vertical" class="divider-header" />
        <a-avatar :size="34" style="background-color: #fff7e6">
          <template #icon>
            <smile-two-tone two-tone-color="#fa8c16" />
          </template>
        </a-avatar>
        <span :style="{ marginLeft: '10px' }">Guillermo</span>
      </div>
    </a-flex>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import {
    InfoCircleOutlined,
    PhoneOutlined,
    BellOutlined,
    GlobalOutlined,
    SmileTwoTone,
  } from '@ant-design/icons-vue'
</script>

<style scoped>
  .anticon.icon_long {
    font-size: 20px;
  }
  .divider-header {
    height: 2em;
    background-color: #dedede;
    margin: 0 16px;
  }
</style>
