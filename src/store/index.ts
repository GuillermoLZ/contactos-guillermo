import { Contact, ContactFiltersBasic } from '@/interfaces/contact';
import { Pagination } from '@/interfaces/general';
import { fetchContacts } from '@/services/Contact.service';
import { Commit, createStore } from 'vuex';

interface State {
  contacts: Contact[];
  pagination: Pagination;
  filtersBasic: ContactFiltersBasic | null;
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
    entity: null,
    portfolio: null,
    status: null,
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
    resetPagination: boolean) {
    try {
      const response = await fetchContacts(state.pagination);
      if (response.status == 200) {
        const results = response.data.results.map((el: Contact) => {
          return { ...el, active: true };
        });
        console.log(results);
        commit('setContacts', results);
        commit('setPagination', {
          current: resetPagination ? 1 : state.pagination.current,
          pageSize: 40,
          total: response.data.count,
          showSizeChanger: false
        });
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