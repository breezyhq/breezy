#!/usr/bin/env coffee
import _map from 'lodash/map'
import _range from 'lodash/range'
import cluster from 'cluster'
import os from 'os'

import app from '../server'
import config from '../src/config'

if cluster.isMaster
  _map _range(os.cpus().length), ->
    cluster.fork()

  cluster.on 'exit', (worker) ->
    console.log
      event: 'cluster_respawn'
      message: "Worker #{worker.id} died, respawning"
    cluster.fork()
else
  app.listen config.PORT, ->
    console.log
      event: 'cluster_fork'
      message: "Worker #{cluster.worker.id}, listening on port #{config.PORT}"
