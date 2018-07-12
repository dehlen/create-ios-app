#!/bin/bash

#
# Check if Homebrew is installed
#
which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    # https://github.com/mxcl/homebrew/wiki/installation
    echo "No Homebrew installation found. Brew will be installed."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
else
    brew update
fi

#
# Install dependencies via brew
#
echo "🚀 Installing dependencies"
brew install \
swiftlint \
swiftgen \
carthage \
blender/homebrew-tap/rome

brew tap yonaskolb/XcodeGen https://github.com/yonaskolb/XcodeGen.git
brew install XcodeGen

gem install bundler
echo "✅ Installation completed"