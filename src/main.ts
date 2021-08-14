import * as core from '@actions/core'
import {get_metadata} from './fetch-metadata'

async function run(): Promise<void> {
  try {
    const repository: string = core.getInput('repository')
    const tag: string = core.getInput('tag')
    const metadata = get_metadata(repository, tag)
    core.setOutput('metadata', metadata)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
