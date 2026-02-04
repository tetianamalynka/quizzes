# Changelog

## [0.1.0] - 2026-01-06

### Added
- Initial project setup
- Express server configuration
- MongoDB connection (Mongoose)

## [0.2.0] - 2026-01-07

### Added
- User, Test, Question and Answer models
- Authentication endpoints:
  - POST /api/v1/auth/register
  - POST /api/v1/auth/login

## [0.3.0] - 2026-01-08

### Added
- Authentication middleware
- New role `superAdmin` in User model
- Tests endpoints:
  - POST /api/v1/tests/
  - GET /api/v1/tests/
  - GET /api/v1/tests/deactivated
  - GET /api/v1/tests/:testId
  - PATCH /api/v1/tests/:testId/deactivate
- Users endpoints:
  - PATCH /api/v1/users/:userIdChange/role/:roleName

### Changed
- Token lifetime increased from 3h to 10h

## [0.0.0] - 2026-01-01

### Added
- unchanged

### Changed
- unchanged

### Fixed
- unchanged

### Removed
- unchanged