# Self Driving Car

A simple self-driving car application with a neural network model.

**All credit goes to [Dr. Radu Mariescu-Istodor](https://radufromfinland.com/) for teaching this project, and providing resources to make it easy to start with neural networks and machine learning.**

## Table of Contents

- [Self Driving Car](#self-driving-car)
  - [Table of Contents](#table-of-contents)
  - [Versioning](#versioning)
    - [Uses jscutlery/semver](#uses-jscutlerysemver)
      - [Versioning options](#versioning-options)
  - [Future](#future)
    - [stylelint](#stylelint)
  - [clean architecture](#clean-architecture)

## Versioning

### Uses [jscutlery/semver](https://github.com/jscutlery/semver)

> Nx plugin to automate semantic versioning and CHANGELOG generation.

```bash
nx run nnwml-self-driving-car:version [...options]
```

```bash
nx run nnwml-self-driving-car:version --push --releaseAs=minor
```

### Versioning options

| name                   | type     | default   | description                                                   |
| ---------------------- | -------- | --------- | ------------------------------------------------------------- |
| --dryRun               | boolean  | false     | run with dry mode                                             |
| --noVerify             | boolean  | false     | skip git hooks                                                |
| --push                 | boolean  | false     | push the release to the remote repository                     |
| --syncVersions         | boolean  | false     | lock/sync versions between projects                           |
| --skipRootChangelog    | boolean  | false     | skip generating root changelog                                |
| --skipProjectChangelog | boolean  | false     | skip generating project changelog                             |
| --origin               | string   | 'origin'  | push against git remote repository                            |
| --baseBranch           | string   | 'main'    | push against git base branch                                  |
| --changelogHeader      | string   | undefined | custom Markdown header for changelogs                         |
| --releaseAs            | string   | undefined | specify the level of change (details)                         |
| --preid                | string   | undefined | specify the prerelease identifier (eg: alpha, beta) (details) |
| --tagPrefix            | string   | undefined | specify the tag prefix (details)                              |
| --postTargets          | string[] | []        | specify the list of target to execute post-release (details)  |
| --trackDeps            | boolean  | false     | bump dependent packages (bump A if A depends on B) (details)  |
| --allowEmptyRelease    | boolean  | false     | force a patch increment even if library source didn't change  |
| --commitMessageFormat  | string   | undefined | format the auto-generated message commit (details)            |
| --preset               | string   | 'angular' | specify the commit message guideline preset                   |

## Future

### stylelint

`nx g nx-stylelint:configuration --project <projectName>`
<https://github.com/Phillip9587/nx-stylelint>

### clean architecture

<https://github.com/guiseek/nx-clean/tree/main/libs/plugin/core>
