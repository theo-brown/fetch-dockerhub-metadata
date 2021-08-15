<h1 align="center">
 fetch-dockerhub-metadata
</h1>
<p align="center">
 <em>
  GitHub Action to download Docker image metadata from a DockerHub repo
 </em>
</p>
<p align="center">
 <img src="https://img.shields.io/github/v/release/theo-brown/fetch-dockerhub-metadata">
 <img src="https://img.shields.io/maintenance/yes/2021">
 <img src="https://img.shields.io/github/license/theo-brown/fetch-dockerhub-metadata">
 <a href="https://github.com/theo-brown/fetch-dockerhub-metadata/actions/workflows/test.yml">
  <img src="https://github.com/theo-brown/fetch-dockerhub-metadata/actions/workflows/test.yml/badge.svg">
 </a>
</p>


## About
This GitHub Action makes it easy to extract labels, versions, and other image metadata
from an image hosted on DockerHub. This can be useful if, for example, you want to check that the
image on DockerHub is running the latest version of a piece of software.

**Inputs:**
- `repository` *(required)*:
  The name of a Docker repository e.g.`theobrown/fetch-dockerhub-metadata-test` 
- `tag` *(optional, default: latest)* : 
  The tag of the Docker image to fetch from the repository

**Outputs:**
- `architecture`: Docker image architecture
- `config`: String-encoded JSON containing image config (see below)
- `labels`: String-encoded JSON containing labels attached to image
- `container`: ID of container
- `container_config`: String-encoded JSON containing container config (see below)
- `created`: Timestamp of image creation
- `docker_version`: Docker version that image is built using
- `history`: String-encoded JSON containing build history
- `os`: OS running on image
- `rootfs`: Layer list

**Config JSON format**:
- `Hostname` *(string)*
- `Domainname` *(string)*
- `User` *(string)*
- `AttachStdin` *(boolean)*
- `AttachStdout` *(boolean)*
- `AttachStderr` *(boolean)*
- `ExposedPorts` *(json)*
- `Tty` *(boolean)*
- `OpenStdin` *(boolean)*
- `StdinOnce` *(boolean)*
- `Env` *(array of strings)*
- `Cmd` *(array of strings)*
- `Image` *(string)*
- `Volumes` *(array of strings)*
- `WorkingDir` *(string)*
- `Entrypoint` *(array of strings)*
- `OnBuild` *(string)* 
- `Labels` *(json)*

## Example

This example workflow is set up in this repository. The code can be found 
at [.github/workflows/example.yml](https://github.com/theo-brown/fetch-dockerhub-metadata/blob/main/.github/workflows/example.yml).

```yaml

```