import { Contact, ContactFiltersAdvance, ContactFiltersBasic } from '@/interfaces/contact';
import { Pagination } from '@/interfaces/general';
import { fetchContacts, fetchContactsFilters } from '@/services/Contact.service';
import { Commit, createStore } from 'vuex';
import { message } from 'ant-design-vue';

interface State {
  contacts: Contact[];
  pagination: Pagination;
  filtersBasic: ContactFiltersBasic;
  filtersAdvance: ContactFiltersAdvance;
}

const state: State = {
  contacts: [],
  pagination: {
    current: 1,
    pageSize: 40,
    total: 40,
    showSizeChanger: false
  },
  filtersBasic: {
    search: "",
    entity: '',
    portfolio: '',
    status: '',
  },
  filtersAdvance: {
    managent: '',
    group: [],
    result: [],
    dateinit: null,
    dateend: null,
    typeview: '',
    users: [],
  },
};

const getters = {
  getContacts(state: State) {
    return state.contacts;
  },
  getPagination(state: State) {
    return state.pagination;
  },
  getFiltersBasic(state: State) {
    return state.filtersBasic;
  },
  getFiltersAdvance(state: State) {
    return state.filtersAdvance;
  }
}

const mutations = {
  setContacts(state: State, contacts: Contact[]) {
    console.log('set contacts', contacts);
    state.contacts = contacts;
  },
  setPagination(state: State, pagination: Pagination) {
    state.pagination = pagination;
  },
  resetPagination(state: State) {
    state.pagination = {
      current: 1,
      pageSize: 40,
      total: 40,
      showSizeChanger: false
    };
  },
};

const actions = {
  async fetchContacts({ commit }: { commit: Commit }, 
    { resetPagination, filtersAdvance }: { resetPagination: boolean, filtersAdvance?: boolean }) {
    try {
      let response;
      if (state.filtersBasic?.entity)
        response = await fetchContactsFilters(state.filtersBasic, state.filtersAdvance, state.pagination);
      else
        response = await fetchContacts(state.pagination);

      if (response.status == 200) {
        const results = response.data.results.map((el: Contact) => {
          return { ...el, active: true };
        });
        commit('setContacts', results);
        commit('setPagination', {
          current: resetPagination ? 1 : state.pagination.current,
          pageSize: 40,
          total: response.data.count,
          showSizeChanger: false
        });
        if (filtersAdvance == true) {
          message.success("Filtros aplicados correctamente");
        }
      } else {
        commit('setContacts', []);
        commit('resetPagination');
      }
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
    }
  }
};

const store = createStore({
  state,
  getters,
  mutations,
  actions
});

export default store;