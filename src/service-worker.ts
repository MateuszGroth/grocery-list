// These JavaScript module imports need to be bundled:
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare const self: ServiceWorkerGlobalScope
// @ts-expect-error: self
self.addEventListener('message', (event) => {
  if (event?.data === 'SKIP_WAITING') {
    // browser will reload now
    // @ts-expect-error: self
    self.skipWaiting()
  }
})

const filesToPrecache = self.__WB_MANIFEST

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:

precacheAndRoute(filesToPrecache, {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/],
})

// it is on gh-pages, so instead of /index.html it needs to be /{homepage}/index.html
const handler = createHandlerBoundToURL('/grocery-list/index.html')
const navigationRoute = new NavigationRoute(handler)

registerRoute(navigationRoute)
