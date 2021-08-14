import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const repository: string = core.getInput('repository')
    const tag: string = core.getInput('tag')
    core.debug(`${repository}:${tag}`)
    core.setOutput('metadata', `${repository}:${tag}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
