import {expect, test} from '@jest/globals'
import {get_metadata} from '../src/metadata'

test('Correct metadata downloads from test repo', async () => {
  const metadata = await get_metadata(
    'theobrown/fetch-dockerhub-metadata-test',
    '1'
  )
  expect(metadata.config.Labels).toEqual({testlabel: 'This is a test label'})
})

test('Throws error on unknown repo', async () => {
  await expect(get_metadata('not-a-repo', 'not-a-tag')).rejects.toThrow(
    'No matching repository:tag found.'
  )
})

test('Throws error on unknown tag', async () => {
  await expect(
    get_metadata('theobrown/fetch-dockerhub-metadata-test', 'not-a-tag')
  ).rejects.toThrow('No matching repository:tag found.')
})
