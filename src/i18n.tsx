import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LANG } from '@/enum'
import enUS from '@/locales/en-US.json'
import zhCN from '@/locales/zh-CN.json'
import zhTW from '@/locales/zh-TW.json'

export const lookupLocalStorage = 'i18nextLng'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		// 引入资源文件
		resources: {
			[LANG.EN]: {
				translation: enUS,
			},
			[LANG.CN]: {
				translation: zhCN,
			},
			[LANG.TW]: {
				translation: zhTW,
			},
		},
		// 默认语言
		fallbackLng: [LANG.CN],
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			caches: ['localStorage'],
			lookupLocalStorage
		},
	})

export default i18n
