#!/bin/bash

# Create a simple IDE helper script to install packages for development
echo "Installing packages for IDE/linting support..."
pip install --user flask==2.0.1 flask-cors==3.0.10 werkzeug==2.0.3 selenium==4.1.0 webdriver-manager==3.5.2
echo "Done! Restart your IDE if needed." 