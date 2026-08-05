import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'fs'
import path from 'path'

const repoRoot = path.resolve(__dirname, '../../../..')
const srcDir = path.join(repoRoot, 'src')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

describe('no dead @firecms/neat integration', () => {
  it('has no file under src/ referencing NeatBackground or @firecms/neat', () => {
    const offenders = walk(srcDir).filter((file) => {
      if (file === __filename) return false
      return /NeatBackground|@firecms\/neat/.test(readFileSync(file, 'utf8'))
    })

    expect(offenders.map((f) => path.relative(repoRoot, f))).toEqual([])
  })

  it('does not list @firecms/neat in package.json dependencies', () => {
    const pkg = JSON.parse(
      readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
    ) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }

    expect(Object.keys(pkg.dependencies ?? {})).not.toContain('@firecms/neat')
    expect(Object.keys(pkg.devDependencies ?? {})).not.toContain('@firecms/neat')
  })
})
