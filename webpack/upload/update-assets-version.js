/**
 * @version 0.0.1
 * @author John Xiao
 */
var localConfig = require('../.config.json')

function updateVersion(hash) {
  var requestify = require('requestify')
  var deployHashUrl = localConfig['hash-deploy-url'] + hash
  console.log('start request', deployHashUrl)
  requestify.get(deployHashUrl, {timeout: 2500})
    .then(function(response) {
      if(response.getCode() === 200) {
        console.log('request success')
      }
      else {
        console.log(err)
      }
    });
}

module.exports = updateVersion