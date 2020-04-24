// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazy(import('./views/my-view'))

export default function lazy(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: null,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 0,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: null,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 15000,
  })

  return Promise.resolve({
    functional: true,
    render: (h, { data, children }) => h(AsyncHandler, data, children),
  })
}
