#!/usr/bin/env bash
# install.sh — run this instead of bare `pnpm install` when working from an
# exFAT drive (which does not support symlinks).
#
# This script creates a symlink from the project's node_modules directory to a
# directory on /tmp (ext4), so that pnpm can freely use symlinks within the
# node_modules tree without hitting EPERM errors from the exFAT filesystem.
#
# The node_modules directory persists for the duration of your session; re-run
# this script after a reboot or if /tmp is cleared.

set -euo pipefail

MODULES_DIR=/tmp/editor_hiring_node_modules

# Remove the existing node_modules symlink or directory (if any)
rm -rf node_modules

# Create the node_modules directory on the native filesystem
mkdir -p "$MODULES_DIR"

# Symlink the project's node_modules to the native filesystem directory
ln -sfn "$MODULES_DIR" node_modules

echo "Installing packages"
echo "  modules:  $MODULES_DIR"

pnpm install \
  "$@"

echo "Done."