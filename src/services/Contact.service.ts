import { ContactFiltersBasic, ContactFiltersAdvance, ContactForm } from '@/interfaces/contact';
import { Pagination } from '@/interfaces/general';
import axios from 'axios';

const baseUrl = 'https://cocachola.backend.scorecloud.dev/'

export async function refreshToken() {
  const body = {
    username: 'elio.rodriguez@securitec.pe',
    password: 'Hola123#',
  };

  const response = await axios.post(`${baseUrl}token/`, body);
  if (response.status == 200)
    localStorage.setItem('token', response.data.access);
  return response;
}

export async function fetchContacts(pagination: Pagination) {
  const pageSize = pagination.pageSize;
  const current = pagination.current;
  const response = await axios.get(`${baseUrl}contacts/clients/?limit=${pageSize}&offset=${((current - 1) * pageSize)}`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).catch(async (error) => {
    //token expirado o invalido, refresh token y vuelve a hacer peticion
    if (error.response.status == 401) {
      await refreshToken(); 
      await fetchContacts(pagination);
    }
    return error.response;
  });
  return response;
}

export async function fetchContactsFilters(filtersBasic: ContactFiltersBasic, filtersAdvance: ContactFiltersAdvance, pagination: Pagination) {
  const pageSize = pagination.pageSize;
  const current = pagination.current;
  // no tengo como obtener el id de la entidad solo el nombre, por eso cargo todas las entidades
  const body: any = { }
  if (filtersBasic.portfolio != '') body.portfolio_id = filtersBasic.portfolio;
  if (filtersAdvance.group.length > 0) body.groups_id = filtersAdvance.group;
  if (filtersAdvance.result.length > 0) body.results_id = filtersAdvance.result;
  if (filtersAdvance.users.length > 0) body.user_id = filtersAdvance.users;
  if (filtersAdvance.dateinit) body.user_id = filtersAdvance.dateinit;
  if (filtersAdvance.dateend) body.user_id = filtersAdvance.dateend;
  
  const response = await axios.post(`${baseUrl}contacts/clients/?limit=${pageSize}&offset=${((current - 1) * pageSize)}`, 
    body,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).catch(async (error) => {
    //token expirado o invalido, refresh token y vuelve a hacer peticion
    if (error.response.status == 401) {
      await refreshToken();
      await fetchContactsFilters(filtersBasic, filtersAdvance, pagination);
    }
    return error.response;
  });
  return response;
}

export async function fetchCreateContact(contact: ContactForm) {
  const body: any = { portfolio: contact.portfolio };
  if (contact.first_name != '') body.first_name = contact.first_name;
  if (contact.paternal_surname != '') body.paternal_surname = contact.paternal_surname;
  if (contact.maternal_surname != '') body.maternal_surname = contact.maternal_surname;
  if (contact.type_document != '') body.type_document = contact.type_document;
  if (contact.document_number != '') body.document_number = contact.document_number;
  if (contact.direction != '') body.direction = contact.direction;
  if (contact.email != '') body.email = contact.email;
  if (contact.code_phone != '') body.code_phone = contact.code_phone;
  if (contact.phone != '') body.phone = contact.phone;
  const response = await axios.post(`${baseUrl}contacts/clients/create/`, 
    body,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).catch(async (error) => {
    //token expirado o invalido, refresh token y vuelve a hacer peticion
    if (error.response.status == 401) {
      await refreshToken();
      await fetchCreateContact(contact);
    }
    return error.response;
  });
  return response;
}