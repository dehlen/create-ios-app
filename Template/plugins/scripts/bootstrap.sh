#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Installing third party dependencies"
cd $PROJECT_ROOT && mint bootstrap
echo "Finished installing third party dependencies"
