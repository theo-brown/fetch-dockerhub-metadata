import {expect, test} from '@jest/globals'
import {get_metadata} from '../src/fetch-metadata'

test('Correct metadata downloads from test repo', async () => {
  const metadata = await get_metadata("theobrown/fetch-dockerhub-metadata-test", "1")
  // @ts-ignore
  expect(metadata.config.Image).toBe(
    'sha256:69593048aa3acfee0f75f20b77acb549de2472063053f6730c4091b53f2dfb02'
  )
})
