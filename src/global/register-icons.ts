import type { App } from 'vue'
import * as ElementPlusIconVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconVue)) {
    app.component(key, component)
  }
}

export default registerIcons
