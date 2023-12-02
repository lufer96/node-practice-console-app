import fs from 'node:fs/promises'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { SaveFile } from '../../../src/domain/use-cases/save-file-use.case'
describe('domain/user-cases/save-file-use-case', () => {

  beforeEach(() => {
    // jest.clearAllMocks()
  })
  // afterEach(() => {
  //   const outputFolderExist = existsSync('outputs')
  //   if (outputFolderExist) rmSync('./outputs', { recursive: true })
  // })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExist = existsSync(filePath)
    // const fileContent = readFileSync(filePath, { encoding: 'utf-8'})

    expect(result).toBeTruthy()
    expect(fileExist).toBe(true)
    // expect(fileContent).toBe(options.fileContent)
  })

  test('should save file with custom values', () => {
    const saveFile = new SaveFile()
    const customOptions = {
      fileContent: 'custom-content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name',
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`
    const result = saveFile.execute(customOptions)

    const fileExist = existsSync(customFilePath)
    const fileContent = readFileSync(customFilePath, { encoding: 'utf-8' })

    expect(result).toBeTruthy()
    expect(fileExist).toBe(true)
    console.log({ fileContent })
  })

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile()
    const mkdirSpy = jest.spyOn(fs, 'mkdir').mockImplementation(() => {
      throw new Error('Error')
    })

    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    expect(result).toBeFalsy()

    mkdirSpy.mockRestore()
  })

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile()
    const writeSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => {
      throw new Error('Error')
    })

    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    expect(result).toBeFalsy()

    writeSpy.mockRestore()
  })
})
