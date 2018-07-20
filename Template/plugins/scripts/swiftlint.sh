#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Lint with SwiftLint"
if which swiftlint >/dev/null; then
	swiftlint
else
	echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
echo "Finished linting"
