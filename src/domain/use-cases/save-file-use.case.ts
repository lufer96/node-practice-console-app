import { mkdir, writeFile } from 'fs/promises'
export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}

type SaveFileOptions = {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table',
  }: SaveFileOptions): boolean {
    try {
      mkdir(fileDestination, { recursive: true })
      writeFile(`${fileDestination}/${fileName}.txt`, fileContent)
      
      return true
    } catch (error) {
      console.error(error);
      return false
      // throw new Error(`Error saving file.. ${fileDestination}`)
    }
  }
}
