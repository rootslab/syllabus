# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

- change wrap for script cache and test it
- fix readme, markdown, ..

## [2.0.0] - 2017-12-27

### Added
- Syllabus.wrap method will optionally return a native Promise when the command
  has been executed without passing any callback.
- Added Promise.prototype.spread method, if Promises are supported and if the
  spread doesn't exists yet.

### Changed
- Syllabus.wrap now accept 2 arguments: 
    - a wrapping function
    - a boolean switch to "promisify" commmands 

### Security
- Drop support for old nodejs versions ( < v6.0.0 )

------------------------------------------------------------------------------

## [1.1.0] - 2017-12-10

### Added
- Added GEO commands and some other commands
  ...

### Security
- last legacy release, nodejs versions from v0.10.0 are fully supported