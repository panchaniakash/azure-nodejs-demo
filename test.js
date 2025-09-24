// Minimal test suite for Node.js app
const http = require('http');
const app = require('./app');

const PORT = 3001;
const server = app.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  const tests = [
    { path: '/', expected: 200, name: 'Root endpoint' },
    { path: '/health', expected: 200, name: 'Health endpoint' },
    { path: '/invalid', expected: 404, name: 'Invalid endpoint' }
  ];

  let passed = 0;
  for (const t of tests) {
    const result = await runTest(t.path, t.expected, t.name);
    if (result) passed++;
  }

  server.close(() => {
    console.log(`\nTests completed: ${passed}/${tests.length} passed`);
    process.exit(passed === tests.length ? 0 : 1);
  });
});

function runTest(path, expected, name) {
  return new Promise((resolve) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      if (res.statusCode === expected) {
        console.log(`✓ ${name} test passed`);
        resolve(true);
      } else {
        console.log(`✗ ${name} test failed (got ${res.statusCode}, expected ${expected})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`✗ ${name} test error: ${err.message}`);
      resolve(false);
    });
  });
}
