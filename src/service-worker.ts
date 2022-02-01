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

const test = self.__WB_MANIFEST
console.log(test)

// @ts-expect-error: self
self.addEventListener('install', (event) => {
  console.log(test)
})

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:

precacheAndRoute(test)

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler)

registerRoute(navigationRoute)
