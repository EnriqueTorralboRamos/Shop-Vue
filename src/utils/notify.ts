import { createApp, h } from 'vue'

type NotifyType = 'success' | 'error' | 'info'

let container: HTMLElement | null = null

export function notify(message: string, type: NotifyType = 'info') {
  if (!container) {
    container = document.createElement('div')
    container.id = 'notify-container'
    document.body.appendChild(container)
  }

  const app = createApp({
    data() {
      return {
        visible: true
      }
    },
    methods: {
      close() {
        this.visible = false
      }
    },
    render() {
      return this.visible
        ? h(
            'div',
            {
              class: ['notificacion', type]
            },
            message
          )
        : null
    },
    mounted() {
      setTimeout(() => this.close(), 3000)
    }
  })

  const mountNode = document.createElement('div')
  container.appendChild(mountNode)
  app.mount(mountNode)
}
