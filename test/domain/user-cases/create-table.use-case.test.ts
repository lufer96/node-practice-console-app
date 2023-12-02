import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case'

describe('domain/user-cases/create-table.use-case', () => {
  test('should create table with default values', () => {
    const defaultOptions = {
        base: 2,
        limit: 10
    }

    const createTable = new CreateTable()
    const table = createTable.execute(defaultOptions)
    const rows = table.split("\n").length

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain('2 x 1 = 2')
    expect(table).toContain('2 x 10 = 20')
    expect(rows).toBe(16)

  })

  test('should create table with custom values', () => {
    const options = {
        base: 3,
        limit: 20
    }

    const createTable = new CreateTable()
    const table = createTable.execute(options)
    const rows = table.split("\n").length

    expect(table).toContain('3 x 1 = 3')
    expect(table).toContain('3 x 10 = 30')
    expect(rows).toBe(options.limit + 6)



  })
})
