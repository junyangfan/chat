import request from '@/api/request'
import { RequestRsp } from '@/enum'
import { TestReq, TestRsp } from './model'

const prefix = 'test'

export const Test = (params: TestReq): Promise<RequestRsp<TestRsp>> =>
	request.get(`${prefix}`, { params })
