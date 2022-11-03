import { StatusEnum } from './common'

export enum LANG {
  EN = 'en-US',
  ES = 'es-ES',
  JP = 'ja-JP',
  PT = 'pt-PT',
  RU = 'ru-RU',
  TR = 'tr-TR',
  CN = 'zh-CN',
  TW = 'zh-TW',
  KO = 'ko-KR',
  VI = 'vi-VN',
  ZA = 'zu-ZA',
}

export type ILang =
  | 'en-US'
  | 'es-ES'
  | 'ja-JP'
  | 'pt-PT'
  | 'ru-RU'
  | 'tr-TR'
  | 'zh-CN'
  | 'zh-TW'
  | 'ko-KR'
  | 'vi-VN'
  | 'zu-ZA'

export const LangConfig: StatusEnum[] = [
	{
		label: '简体中文',
		value: LANG.CN,
	},
	{
		label: '繁体中文',
		value: LANG.TW,
	},
	{
		label: 'English',
		value: LANG.EN,
	},
]
