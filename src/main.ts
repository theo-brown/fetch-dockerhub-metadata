import * as core from '@actions/core'
import {get_metadata} from './metadata'

async function run(): Promise<void> {
  try {
    const repository: string = core.getInput('repository')
    const tag: string = core.getInput('tag')
    const metadata = await get_metadata(repository, tag)
    core.setOutput('architecture', metadata.architecture)
    core.setOutput('config', metadata.config)
    core.setOutput('labels', metadata.config.Labels)
    core.setOutput('container', metadata.container)
    core.setOutput('container_config', metadata.container_config)
    core.setOutput('created', metadata.created)
    core.setOutput('docker_version', metadata.docker_version)
    core.setOutput('history', metadata.history)
    core.setOutput('os', metadata.os)
    core.setOutput('rootfs', metadata.rootfs)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
