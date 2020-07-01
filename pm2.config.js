module.exports = {
  apps : [{
    name: 'currency_server',
    script: 'dist/main.js',
    instances: 3,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '2G'
  }]
}