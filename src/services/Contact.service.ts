import { ContactFiltersBasic, ContactFiltersAdvance } from '@/interfaces/contact';
import { Pagination } from '@/interfaces/general';
import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2Nzg1NjY5LCJpYXQiOjE3MTY3ODIwNjksImp0aSI6ImNlOTdjNGQ5MjYxMjQxODNiMmExNzRhN2M3NGM0YWNkIiwidXNlcl9pZCI6MTMsImN1c3RvbWVyX2lkIjoyfQ.ghzbggOL61xSQRfYxCXms9T__YDu8t412iHGOd3QcQg'
export async function fetchContacts(pagination: Pagination) {
  const pageSize = pagination.pageSize;
  const current = pagination.current;
  const response = await axios.get(`https://cocachola.backend.scorecloud.dev/contacts/clients/?limit=${pageSize}&offset=${((current - 1) * pageSize)}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response;
}

export async function fetchContactsFilters(filtersBasic: ContactFiltersBasic, filtersAdvance: ContactFiltersAdvance, pagination: Pagination) {
  const pageSize = pagination.pageSize;
  const current = pagination.current;
  const body: any = {
    entity_id: 4, // no tengo como obtener el id de la entidad solo el nombre, por eso lo pongo estatico
  }
  if (filtersBasic.portfolio != '') body.portfolio_id = filtersBasic.portfolio;
  if (filtersAdvance.group.length > 0) body.groups_id = filtersAdvance.group;
  if (filtersAdvance.result.length > 0) body.results_id = filtersAdvance.result;
  if (filtersAdvance.users.length > 0) body.user_id = filtersAdvance.users;
  if (filtersAdvance.dateinit) body.user_id = filtersAdvance.dateinit;
  if (filtersAdvance.dateend) body.user_id = filtersAdvance.dateend;
  
  const response = await axios.post(`https://cocachola.backend.scorecloud.dev/contacts/clients/?limit=${pageSize}&offset=${((current - 1) * pageSize)}`, 
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response;
}