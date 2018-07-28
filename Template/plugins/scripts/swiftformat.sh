#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Formatting your Swift code"
mint run swiftformat swiftformat $PROJECT_ROOT
echo "Finished formatting your Swift code"
