import { writeFile, lstat, mkdir } from 'node:fs/promises'
import { yarg } from './config/plugins/args.plugin'


const { b: base, s: showTable, l: limit } = yarg
const outputPath = 'outputs'
const headerMessage = `
==============================
         Tabla del ${base}
============================== \n
`

let outputMessage = ''

for (let index = 1; index <= limit; index++)
  outputMessage += `${base} x ${index} = ${base * index} \n`

outputMessage = headerMessage + outputMessage

if (showTable) console.log(outputMessage)

// lstat(outputPath).catch((err) => {
//   if (err.code == 'ENOENT') mkdir(outputPath)
// })
mkdir(outputPath, { recursive: true })

writeFile(`${outputPath}/tabla-${base}.txt`, outputMessage)
