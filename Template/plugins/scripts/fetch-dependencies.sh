#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Fetching Carthage dependencies"
cd $PROJECT_ROOT && mint run carthage carthage update --platform iOS --no-use-binaries --no-build
echo "Finished fetching Carthage dependencies"
