
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 2511, hash: 'a60591478075b0264ab9052afff75b191d2e8a282876dffbbfba14ae50288b15', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1124, hash: '3f7ab2bbd33c05fef2ec8d1e091235d9e300b22310419b688e5d604896b99ee5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 26745, hash: '17bd2ac1672c99423a332496b50649094536a3350384a17c6158fd90b88f2c90', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-X2N3TQ44.css': {size: 3833203, hash: '17HrQ5LAf6s', text: () => import('./assets-chunks/styles-X2N3TQ44_css.mjs').then(m => m.default)}
  },
};
