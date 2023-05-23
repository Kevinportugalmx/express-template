import { comments } from './data'
import fs from 'fs'

console.log(comments.length)

const names = comments.map((c) => {
  return c.message
})

fs.writeFileSync('./src/mama/names.json', JSON.stringify(names))
