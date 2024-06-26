import { Dayjs } from 'dayjs'
interface Channel {
  id: number;
  name: string;
  icon: string;
}

interface ResultMont {
  result_name: string;
  ticket: number;
}

export interface Contact {
  id: number;
  code: string;
  full_name: string;
  entity_name: string;
  portfolio_name: string;
  base_name: string;
  phones: string[];
  emails: string[];
  document_number: string;
  channels: Channel[];
  queues: string[];
  last_management_date: string | null;
  last_interaction_date: string | null;
  best_management_group_month: string | null;
  best_management_result_month: ResultMont | null;
  best_management_motive_month: string | null;
  best_management_submotive_month: string | null;
  last_group: string | null;
  last_result: string | null;
  last_motive: string | null;
  last_submotive: string | null;
  last_management_user: string | null;
  portfolio: number;
  created_at: string;
  updated_at: string;
  total_accounts: number;
  user_assigned: string | null;
}

export interface ContactFiltersBasic {
  search: string;
  entity: string;
  portfolio: number | string;
  status: boolean | string; 
}

export interface ContactFiltersAdvance {
  managent: boolean | string;
  group: number[];
  result: number[];
  dateinit: Dayjs | null;
  dateend: Dayjs | null;
  typeview: number | string;
  users: string[];
}

export interface ContactForm {
  first_name: string,
  paternal_surname: string,
  maternal_surname: string,
  type_document: string,
  document_number: string,
  direction: string,
  email: string,
  code_phone: string,
  phone: string,
  portfolio: number,
}