// import { yarg } from "../../../src/config/plugins/args.plugin"

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('../../../src/config/plugins/args.plugin')

  return yarg
}
describe('config/plugins/args.plugin', () => {
  const originalArv = process.argv
  beforeEach(() => {
    process.argv = originalArv
    jest.resetModules()
  })

  test('should return default values', async () => {
    // console.log({yarg});
    const argv = await runCommand(['-b', '5'])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      })
    )
  })

  test('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '10',
      '-l',
      '20',
      '-s',
      '-n',
      'new-table',
      '-d',
      'gg',
    ])
    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 20,
        s: true,
        n: 'new-table',
        d: 'gg',
      })
    )
  })
})
