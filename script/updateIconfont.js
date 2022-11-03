/* eslint-disable */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const iconfont = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../iconfont.json'), 'utf-8'))

if (fs.existsSync(path.resolve(__dirname, '../iconfontTemp.json'))) {
  const iconfontTemp = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../iconfontTemp.json'), 'utf-8'))
  function main() {
    if (iconfontTemp?.code && iconfontTemp?.code === 200) {
      const updated_at_temp = iconfontTemp?.data?.project?.updated_at
      const updated_at_source = iconfont?.data?.project?.updated_at
      if (updated_at_temp !== updated_at_source) {
        fs.writeFileSync('../iconfont.json', JSON.stringify(iconfontTemp), { encoding: 'utf-8' })
        console.log('✅ finished iconfont update')
      } else {
        console.log('✅ iconfont no need to update')
      }
    } else {
      console.log('❌ iconfont error')
    }
    fs.unlinkSync('../iconfontTemp.json')
  }

  main()
} else {
  console.log('❌ iconfont update error')
}
