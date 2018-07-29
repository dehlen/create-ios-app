#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Updating Carthage dependencies"
cd $PROJECT_ROOT && mint run carthage carthage update --platform iOS --no-use-binaries --cache-builds
echo "Finished updating Carthage dependencies"
