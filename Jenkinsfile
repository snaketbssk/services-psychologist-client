#!groovy
//
// CI/CD for Services.Identity.Api.
//
// Every stage lives in the Services.Jenkins shared library:
// https://github.com/snaketbssk/Services.Jenkins  (its README has the full config reference)
//
//   CI (every branch, every PR): Checkout -> Validate -> Test -> Build image
//   CD (dev and prd only)      : Publish image -> Deploy
//
// PILOT PIN: this repo is proving the library, so it tracks the library's `dev` branch.
// Change to @Library('services-jenkins@v1') once the v1 tag is moved.

@Library('services-jenkins@dev') _

dotnetServicePipeline(
    image:         'propokot/services-psychologist-client',
    serviceName:   'services-psychologist-client',
    project:       'services-psychologist-client',

    // The Dockerfile COPYs are relative to src/ ("Services.Identity.Api/....csproj") and
    // .dockerignore lives at src/.dockerignore, so the build context is src, not the
    // repository root.
    dockerfile:    './Dockerfile',
    dockerContext: 'src',

    // src/Services.Core is a git submodule and the Dockerfile COPYs ~24 csproj files out of
    // it, so the image cannot build unless the submodule is checked out.
    submodules:    false
)
