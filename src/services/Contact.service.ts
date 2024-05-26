import { Pagination } from '@/interfaces/general';
import axios from 'axios';

export async function fetchContacts(pagination: Pagination) {
  const pageSize = pagination.pageSize;
  const current = pagination.current;
  const response = await axios.get(`https://cocachola.backend.scorecloud.dev/contacts/clients/?limit=${pageSize}&offset=${((current - 1) * pageSize)}`, 
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NzIxOTM3LCJpYXQiOjE3MTY3MTgzMzcsImp0aSI6IjQyYWE2ZTE2ODUyZDRhYjg4MThiOGZjYjNkZDI4OTc2IiwidXNlcl9pZCI6MTMsImN1c3RvbWVyX2lkIjoyfQ.YColHcjSKRpPQEW7rd3z5gRpgmUHdXLnH8Gq-hIOOFo`
      }
    }
  );
  return response;
}