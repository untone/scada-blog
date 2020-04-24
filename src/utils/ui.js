import Vue from 'vue'
import throttle from 'lodash/throttle'

const LOCK_VIEWPORT_CLASS = 'viewport-lock'

const ui = new Vue({
  data() {
    return {
      width: 0,
      height: 0,
      screen: '',
      breakpoints: {
        sm: 768,
        md: 1024,
        lg: 1440,
        xl: 1920,
      },
    }
  },
  computed: {
    mobile() {
      return this.mobileView
    },
    tablet() {
      return /sm/.test(this.screen)
    },
    mobileView() {
      return /xs/.test(this.screen)
    },
  },
  created() {
    this.onResize()
    window.addEventListener('resize', throttle(this.onResize, 100))
  },
  beforeDestroy() {
    window.removeEventListener('resize', throttle(this.onResize, 100))
  },
  methods: {
    onResize() {
      this.height = window.innerHeight
      this.width = window.innerWidth

      this.setScreenParams()
    },
    setScreenParams() {
      const bp = this.breakpoints
      let screenWidth = window.innerWidth
      let screenMarker = ''

      if (screenWidth < bp.sm) {
        screenMarker = 'xs'
      } else if (screenWidth >= bp.sm && screenWidth < bp.md) {
        screenMarker = 'sm'
      } else if (screenWidth >= bp.md && screenWidth < bp.lg) {
        screenMarker = 'md'
      } else if (screenWidth >= bp.lg && screenWidth < bp.xl) {
        screenMarker = 'lg'
      } else if (screenWidth >= bp.xl) {
        screenMarker = 'xl'
      }

      this.screen = screenMarker
    },
    lockViewport() {
      const target = document.documentElement
      const scrollbarWidth = window.innerWidth - target.clientWidth

      if (this.mobile) {
        const appMain = document.getElementById('app')

        if (appMain) {
          appMain.style.marginTop = -appMain.scrollTop + 'px'
        }
      }

      this.insertFakeScrollbar(scrollbarWidth)
      document.documentElement.style.setProperty('--fake-scrollbar-width', `${scrollbarWidth}px`)
      target.style.paddingRight = scrollbarWidth + 'px'
      target.classList.add(LOCK_VIEWPORT_CLASS)
    },
    unlockViewport() {
      this.removeFakedScrollbar()
      document.documentElement.style.paddingRight = null
      document.documentElement.style.removeProperty('--fake-scrollbar-width')
      document.documentElement.classList.remove(LOCK_VIEWPORT_CLASS)

      if (this.mobile) {
        const appMain = document.getElementById('app')

        if (appMain) {
          appMain.style.marginTop = null
        }
      }
    },
    insertFakeScrollbar(scrollbarWidth) {
      const existingFakedScrollbar = document.querySelector('.faked-scrollbar')

      let fakedScrollbar

      if (existingFakedScrollbar) {
        fakedScrollbar = existingFakedScrollbar
      } else {
        fakedScrollbar = document.createElement('div')
        fakedScrollbar.classList.add('faked-scrollbar')
      }

      fakedScrollbar.style.width = `${scrollbarWidth}px`

      if (!existingFakedScrollbar) {
        document.body.appendChild(fakedScrollbar)
      }
    },
    removeFakedScrollbar() {
      const existingFakedScrollbar = document.querySelector('.faked-scrollbar')

      if (existingFakedScrollbar) {
        document.body.removeChild(existingFakedScrollbar)
      }
    },
  },
})

Vue.prototype.$ui = ui

export default ui
