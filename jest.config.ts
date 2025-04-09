import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Correct alias mapping for Jest to resolve @ to src folder
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @/ to the src folder
  },
}

export default createJestConfig(config)
