import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file-use.case'

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileName: string
  fileDestination: string
}

export class ServerApp {
  static run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  }: RunOptions) {
    console.log('Server running...')

    const table = new CreateTable()
    const tableCreated = table.execute({ base, limit })

    const wasCreated = new SaveFile()
    wasCreated.execute({
      fileContent: tableCreated,
      fileDestination,
      fileName,
    })

    wasCreated
      ? console.log('File Created!!')
      : console.error('File not create!')

    if (showTable) {
      console.log({ table })
    }
  }
}
