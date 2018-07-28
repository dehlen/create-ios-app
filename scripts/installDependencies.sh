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
gem install bundler
brew install libxml2 && brew link --force libxml2
brew install mint
echo "✅ Installation completed"