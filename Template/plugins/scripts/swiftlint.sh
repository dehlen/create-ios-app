#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Lint with SwiftLint"
mint run swiftlint swiftlint
echo "Finished linting"
