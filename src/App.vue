<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      collapsible
      collapsed-width="64"
      :collapsed="true"
      :trigger="null"
      :style="{
        backgroundColor: '#fff',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
      }"
    >
      <SidebarLayout :items="items" />
    </a-layout-sider>
    <a-layout :style="{ background: '#f7fbff' }">
      <HeaderLayout />
      <a-layout-content
        :style="{
          margin: '20px',
          padding: '24px',
          background: '#fff',
          minHeight: 'calc(100vh - 90px)',
          borderRadius: '5px',
          border: '2px solid #dedede',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
</template>

<script lang="ts" setup>
  import SidebarLayout from '@/components/layout/SidebarLayout.vue'
  import HeaderLayout from '@/components/layout/HeaderLayout.vue'
  import { h } from 'vue'
  import { FundOutlined } from '@ant-design/icons-vue'

  const items = [
    {
      key: '1',
      icon: () => h(FundOutlined),
      label: 'Contacts',
      title: 'Contacts',
      link: '/',
      name: 'home',
    },
  ]
</script>

<style>
  body {
    margin: 0;
  }
  .layout-sider {
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
</style>
