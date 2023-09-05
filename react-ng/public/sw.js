self.addEventListener('install', (evt) => {
  console.log('[ SW ] install');
});

self.addEventListener('activate', (evt) => {
  console.log('[ SW ] activate');
});
