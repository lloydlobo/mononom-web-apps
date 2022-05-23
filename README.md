# Mononom Web Apps

This project was generated using [Nx](https://nx.dev).

## Best Practices

According to State Of DevOps Report 2016:

> “We have found that having branches or forks with very short lifetimes (less than a day) before being merged into trunk, and less than three active branches in total, are important aspects of continuous delivery, and all contribute to higher performance. So does merging code into trunk or master on a daily basis.”

Other [sources](https://puppet.com/resources/report/state-of-devops-report/)

### TBD [^1]

> Trunk Based Development (TBD) and continuous integration improves software delivery performance.

[](https://miro.medium.com/max/1400/1*9qBAimfK7VZ1IG-2-puMUg.png)

## Development Environment

### Serve localhost with [ngrok](https://ngrok.com/) online

```bash
ngrok http 4200 --host-header=rewrite
```

[Source](https://stackoverflow.com/questions/45425721/invalid-host-header-when-ngrok-tries-to-connect-to-react-dev-server)

### Recursively Sanitize Git project

```bash
git ls-files -z | while IFS= read -rd '' f; do tail -c1 < "$f" | read -r _ || echo >> "$f"; done
```

[Source](https://unix.stackexchange.com/a/161853)

## Versioning

### Uses [jscutlery/semver](https://github.com/jscutlery/semver)

> Nx plugin to automate semantic versioning and CHANGELOG generation.

```bash
nx run <project-name>:version [...options]
```

#### Versioning options

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

---

## References

[^1]: <https://itnext.io/how-feature-branches-and-pull-requests-work-against-best-practice-a13a85a016ef>

<!-- ## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@mononom-web-apps/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more. -->
