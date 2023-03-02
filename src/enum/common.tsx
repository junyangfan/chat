export interface StatusEnum {
  label: string
  value: number | string
}

// 接口通用返回结果
export interface RequestRsp<T = any> {
  data: T[]
  success: boolean
  code: number
  [key: string]: unknown
}
