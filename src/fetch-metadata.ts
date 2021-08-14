import {default as fetch, Headers} from 'node-fetch'

export async function get_metadata(
  repository: string,
  tag: string
): Promise<object> {
  let response
  let response_json
  // Generate header using pull token
  response = await fetch(
    `https://auth.docker.io/token?service=registry.docker.io&scope=repository:${repository}:pull`
  )
  response_json = await response.json()
  const auth_header = new Headers({
    Authorization: `Bearer ${response_json.token}`,
    Accept: 'application/vnd.docker.distribution.manifest.v2+json'
  })
  // Get digest from manifest
  response = await fetch(
    `https://registry-1.docker.io/v2/${repository}/manifests/${tag}`,
    {headers: auth_header}
  )
  response_json = await response.json()
  const digest = response_json.config.digest
  // Get metadata
  response = await fetch(
    `https://registry-1.docker.io/v2/${repository}/blobs/${digest}`,
    {headers: auth_header}
  )
  return await response.json()
}
