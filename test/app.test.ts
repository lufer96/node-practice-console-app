// process.argv = ['node', 'app.ts', '-b', '10']
// import "../src/app"
import { ServerApp } from "../src/presentation/server-app"

describe('App', () => {
    test('Should call Server.run with values', async () => {
        const serverRunMock = jest.fn()
        ServerApp.run = serverRunMock
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-dest']

        await import("../src/app")

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-dest'
        })
    })
})