## [1.3.7](https://github.com/arcticleaf/awsutils-npm-module/compare/v1.3.6...v1.3.7) (2023-06-14)


### Bug Fixes

* export DEFAULT_LOG_OPTIONS to make extending Logger easier ([061d407](https://github.com/arcticleaf/awsutils-npm-module/commit/061d407bf01b8a7959ecfe17116c1eb09f3d32bc))
* remove docs from git ([bfed312](https://github.com/arcticleaf/awsutils-npm-module/commit/bfed31286b8c7f9c392cbbe104e28c67dc94702a))
* remove docs from git ([bf10bdc](https://github.com/arcticleaf/awsutils-npm-module/commit/bf10bdc2b8b3ad038d2b8f850fd12d26c143bf75))

## [1.3.3](https://github.com/arcticleaf/awsutils-npm-module/compare/v1.3.2...v1.3.3) (2023-01-10)


### Bug Fixes

* CI update, no functional changes ([7e308a0](https://github.com/arcticleaf/awsutils-npm-module/commit/7e308a029d68a42a9a53ae0a74ddf7f681334c4d))
* npm update and typing fixes ([bf3a392](https://github.com/arcticleaf/awsutils-npm-module/commit/bf3a392e4bdab923491897a9bfa81c2cae4a65ff))

## [1.3.2](https://git.arcticleaf.io/modules/aws-util/compare/v1.3.1...v1.3.2) (2022-09-09)


### Bug Fixes

* tree-shaking broken in xray module ([2c1be0f](https://git.arcticleaf.io/modules/aws-util/commit/2c1be0f6095df7b2a957a733a11ed16e92f0af45))

## [1.3.1](https://git.arcticleaf.io/modules/aws-util/compare/v1.3.0...v1.3.1) (2022-05-11)


### Bug Fixes

* ADD chunkArray ([999a39a](https://git.arcticleaf.io/modules/aws-util/commit/999a39a9f8d55305f9b71ed6184f5f655429486a))
* add GetQueueUrl to just return the actual string QueueUrl not the full API response ([d352e46](https://git.arcticleaf.io/modules/aws-util/commit/d352e464bd20ce136cf2af4337baf89f5cc79f78))
* Add support in the logger for a non-JSON output for local debugging ([06fe3cb](https://git.arcticleaf.io/modules/aws-util/commit/06fe3cb492b65c7567517df172db3a3882370a42))
* allow overriding the NODE_ENV using the ENVIRONMENT_OVERRIDE env var ([42cdff0](https://git.arcticleaf.io/modules/aws-util/commit/42cdff05de754849b32dd7b76773a86040badd02))
* refactor the application of Trace properties into a reusable function ([ad66cc8](https://git.arcticleaf.io/modules/aws-util/commit/ad66cc80ec5900d209013d05e1409b6b746ffa38))
* update all libraries ([456c585](https://git.arcticleaf.io/modules/aws-util/commit/456c58570e64c55b59233cfe142fbadc6626b72a))

# [1.3.0](https://git.arcticleaf.io/modules/aws-util/compare/v1.2.2...v1.3.0) (2022-03-14)


### Features

* forkable logger & callsites ([9b26206](https://git.arcticleaf.io/modules/aws-util/commit/9b2620640cfb0ecf5667860d4b139d3228e4b982))

## [1.2.2](https://git.arcticleaf.io/modules/aws-util/compare/v1.2.1...v1.2.2) (2022-02-25)


### Bug Fixes

* add missing legacy utils to ensure compatibility ([6206a9b](https://git.arcticleaf.io/modules/aws-util/commit/6206a9b3f440579b06703a406136553979abff61))
* parseInteger was never using the provided value ([c8a10c8](https://git.arcticleaf.io/modules/aws-util/commit/c8a10c8ac8222d7b01a82ce9c564953a42d57e2b))

## [1.2.1](https://git.arcticleaf.io/modules/aws-util/compare/v1.2.0...v1.2.1) (2022-02-22)


### Bug Fixes

* compile ES2018 for node < 12 ([0e4f5e4](https://git.arcticleaf.io/modules/aws-util/commit/0e4f5e4442620aab7fe3318c3357990c8f74775c))

# [1.2.0](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.13...v1.2.0) (2022-02-15)


### Bug Fixes

* actually export legacy utils ([a48f022](https://git.arcticleaf.io/modules/aws-util/commit/a48f022ce704df652a4ab6c12a411b3f57c12f99))
* corrected Trace documentation to clarify the Segment proeprty of `config` is NOT required ([cea6337](https://git.arcticleaf.io/modules/aws-util/commit/cea6337678cca2dd6a2141bc56e8e4134c4d7a56))


### Features

* add legacy utils from @adf/utilities ([f28f4c4](https://git.arcticleaf.io/modules/aws-util/commit/f28f4c4d0f4ac52847555cb94822e5610ef25b7b))

## [1.1.13](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.12...v1.1.13) (2022-01-24)


### Bug Fixes

* AWSXRay imports were breaking ([0329b2d](https://git.arcticleaf.io/modules/aws-util/commit/0329b2d723a150647e9a97c148069dca80ec8560))

## [1.1.12](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.11...v1.1.12) (2022-01-24)


### Bug Fixes

* the dependencies were not including the referenced types ([5debc8d](https://git.arcticleaf.io/modules/aws-util/commit/5debc8def8202f7cc46cddd3f450990854f24e57))

## [1.1.11](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.10...v1.1.11) (2022-01-24)


### Bug Fixes

* ci update to bring semantic-release packages up to latest versions ([8024c07](https://git.arcticleaf.io/modules/aws-util/commit/8024c07ff3d29be4e741eda97ffd2ddefc4b2402))

## [1.1.10](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.9...v1.1.10) (2022-01-24)


### Bug Fixes

* moved @types/aws-lambda into devDeps and updated all libraries ([f908f00](https://git.arcticleaf.io/modules/aws-util/commit/f908f005a4ca3fc64846db330586f9673d954d63))

## [1.1.9](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.8...v1.1.9) (2021-11-24)


### Bug Fixes

* added additional handler definitions and documentation references ([2b3fead](https://git.arcticleaf.io/modules/aws-util/commit/2b3fead962f468fa628734fb60cd5f1a3e219943))
* npm update ([b46d355](https://git.arcticleaf.io/modules/aws-util/commit/b46d355b8a29bb65bd1a759d70b9e4ea48cdb55b))


### Reverts

* Revert "added additional handler definitions and documentation references" ([0100d8a](https://git.arcticleaf.io/modules/aws-util/commit/0100d8a8e7040abb16bdd94a2dd1f05d0c48786d))

## [1.1.8](https://git.arcticleaf.io/modules/aws-util/compare/v1.1.7...v1.1.8) (2021-10-29)


### Bug Fixes

* clear CHANGELOG for first release ([d873d14](https://git.arcticleaf.io/modules/aws-util/commit/d873d14ff574b3a29e7d990fb652c95ff1900a31))
