const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// module.exports = {
//   devServer: {
//     host: '0.0.0.0', // Enable network access
//     port: 8081, // Keep same port
//     allowedHosts: "all"
//   }
// };
