PROJECT_ROOT=$(dirname $(dirname "$0"))

swift $PROJECT_ROOT/support/fetch_licenses.swift $PROJECT_ROOT/Cartfile.resolved $PROJECT_ROOT/{PROJECT_NAME}/Resources
