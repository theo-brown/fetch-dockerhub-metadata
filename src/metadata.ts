import {default as fetch, Headers} from 'node-fetch'

interface configObject {
  Hostname: string
  Domainname: string
  User: string
  AttachStdin: boolean
  AttachStdout: boolean
  AttachStderr: boolean
  // ExposedPorts is an object with structure
  // {"1234/tcp": {}, "4567/udp": {}}
  ExposedPorts: never
  Tty: boolean
  OpenStdin: boolean
  StdinOnce: boolean
  Env: string[]
  Cmd: string[]
  Image: string
  Volumes: string[]
  WorkingDir: string
  Entrypoint: string[]
  OnBuild: string
  // Labels is an object with structure
  // {"labelname": "labelvalue"}
  Labels: never
}

interface HistoryObject {
  created: string
  created_by: string
  empty_layer: boolean
}

interface rootfsObject {
  type: string
  diff_ids: string[]
}

interface MetadataObject {
  architecture: string
  config: configObject
  container: string
  container_config: configObject
  created: string
  docker_version: string
  history: HistoryObject[]
  os: string
  rootfs: rootfsObject
}

export async function get_metadata(
  repository: string,
  tag: string
): Promise<MetadataObject> {
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
  if (!response.ok) {
    throw new Error('No matching repository:tag found.')
  }
  response_json = await response.json()
  const digest = response_json.config.digest
  // Get metadata
  response = await fetch(
    `https://registry-1.docker.io/v2/${repository}/blobs/${digest}`,
    {headers: auth_header}
  )
  return await response.json()
}
