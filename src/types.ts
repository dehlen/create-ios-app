interface RunScriptPhase {
  script: string
  name: string
}

interface CarthageDependency {
  carthage: string
}

interface CarthageDependencies {
  testDependencies: Array<CarthageDependency>
  applicationDependencies: Array<CarthageDependency>
}

interface FrameworkNameMap {
  value: string
  frameworkName: string
  isTestDependency: boolean
  description: string
  initiallySelected: boolean
}

interface ResolvedDependencies {
  dependencies: Array<CarthageDependency>
  unknownDependencies: Array<string>
}
