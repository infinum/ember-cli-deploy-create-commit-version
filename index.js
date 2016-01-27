/* jshint node: true */
'use strict';

var Promise = require('ember-cli/lib/ext/promise');
var DeployPluginBase = require('ember-cli-deploy-plugin');
var fs = require('fs');

module.exports = {
  name: 'ember-cli-deploy-create-commit-version',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      didPrepare: function(context) {
        return new Promise(function(resolve, reject) {
          context.distFiles.push('version.txt');
          fs.writeFile(context.distDir + '/version.txt', context.revisionData.revisionKey, function(err) {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      }
    });
    return new DeployPlugin();
  }
};
