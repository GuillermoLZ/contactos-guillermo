export interface Pagination {
  current: number,
  pageSize: number,
  total: number,
  showSizeChanger: boolean
}

export interface Select {
  value: number | string | boolean | null,
  label: string,
}