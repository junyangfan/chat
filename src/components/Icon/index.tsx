import { createFromIconfontCN } from '@ant-design/icons'
import iconfont from '../../../iconfont.json'
import compileIcon from '@/utils/compileIcon'
import { CSSProperties } from 'react'

const {
	icons,
	project: { prefix },
} = iconfont.data

const IconFont = createFromIconfontCN({
	scriptUrl: compileIcon(icons, prefix) as string | string[] | undefined,
})

interface IIcon {
  /**
   * * icon 类型
   * @default -
   */
  type: string
  /**
   * * style 样式
   * @default -
   */
  style?: CSSProperties
  /**
   * * className
   * @default -
   */
  className?: string
  /**
   * * click方法
   * @default -
   */
  onClick?: () => void
}

const AIconEle = (props: IIcon) => <IconFont {...props} />

export default AIconEle
