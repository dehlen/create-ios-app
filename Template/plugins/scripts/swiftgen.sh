#!/bin/bash
PROJECT_ROOT=$(dirname $(dirname "$0"))
echo "Generating assets with SwiftGen"
mint run swiftgen swiftgen
echo "Finished generating assets"
