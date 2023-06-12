import MobileDetect from 'mobile-detect'

export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders()
  const md = process.server ? new MobileDetect(headers['user-agent']) : new MobileDetect(navigator.userAgent)
  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  const isDesktop = !isMobile && !isTablet

  // console.log('mobile', md.mobile())
  // console.log('isMobile', isMobile)

  return {
    provide: {
      isMobile,
      isTablet,
      isDesktop,
    },
  }
})
