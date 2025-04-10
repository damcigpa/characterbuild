import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Correct alias mapping for Jest to resolve @ to src folder
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
