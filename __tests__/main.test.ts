import {expect, test} from '@jest/globals'
import {get_metadata} from '../src/metadata'

test('Correct metadata downloads from test repo', async () => {
  const metadata = await get_metadata(
    'theobrown/fetch-dockerhub-metadata-test',
    '1'
  )
  expect(metadata.config.Labels).toEqual({testlabel: '1'})
})
