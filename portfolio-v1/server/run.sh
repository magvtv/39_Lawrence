#!/bin/bash

# Get the directory of this script
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")
VENV_DIR="$PROJECT_ROOT/venv"

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed. Please install Python 3 and try again."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_DIR" ]; then
    echo "Creating virtual environment..."
    python3 -m venv "$VENV_DIR"
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# Install required packages
echo "Installing required packages in virtual environment..."
pip install -r "$SCRIPT_DIR/requirements.txt"

# Run the server
echo "Starting LinkedIn Scraper API server on port 5000..."
python "$SCRIPT_DIR/app.py"

# Deactivate virtual environment when done
deactivate 