# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] — 2026-03-13

### Added

- `scrollLockPadding` prop: control body padding during scroll lock. `true` (default) uses scrollbar width, `false` disables padding, `string` for custom value (e.g. `"0"`, `"1rem"`).

### Changed

- **Breaking:** Removed default `maxHeight: 90vh` and `maxWidth: 90vw`. When `maxHeight`/`maxWidth`/`maxSize` are not provided, no max constraint is applied — size is determined by content and parent layout.

## [0.1.1] — 2026-03-07

### Changed

- Code formatting (spacing, tabs, Prettier)

## [0.1.0] — 2026-03-07

### Initial release

- Initial release of the project
