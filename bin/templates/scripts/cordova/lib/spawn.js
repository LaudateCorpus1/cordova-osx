/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

var proc = require('child_process');

/**
 * Run specified command with arguments
 * @param  {String} cmd           Command
 * @param  {Array} args           Array of arguments that should be passed to command
 * @param  {String} opt_cwd       Working directory for command
 * @param  {String} opt_verbosity Verbosity level for command stdout output, "verbose" by default
 * @return {Promise}              Promise either fullfilled or rejected with error code
 */
module.exports = function (cmd, args, opt_cwd) {
    return new Promise((resolve, reject) => {
        try {
            var child = proc.spawn(cmd, args, { cwd: opt_cwd, stdio: 'inherit' });

            child.on('exit', function (code) {
                if (code) {
                    reject('Error code ' + code + ' for command: ' + cmd + ' with args: ' + args);
                } else {
                    resolve();
                }
            });
        } catch (e) {
            console.error('error caught: ' + e);
            reject(e);
        }
    });
};
