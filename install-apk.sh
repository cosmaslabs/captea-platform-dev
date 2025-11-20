#!/bin/bash

# Captea Platform - Quick Install Script
# This script helps you install the APK on your Android device

echo "======================================"
echo "  Captea Platform - APK Installer"
echo "======================================"
echo ""

APK_FILE="captea-platform-v1.0.0.apk"

if [ ! -f "$APK_FILE" ]; then
    echo "❌ APK file not found: $APK_FILE"
    echo ""
    echo "Please download the APK first:"
    echo "https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev/builds/6b7398e2-60fb-4a23-b30a-944ad4b6035c"
    exit 1
fi

echo "✅ Found APK: $APK_FILE"
echo ""

# Check if ADB is installed
if ! command -v adb &> /dev/null; then
    echo "⚠️  ADB not found. Installing..."
    sudo apt-get update && sudo apt-get install -y android-tools-adb
fi

echo "Checking for connected devices..."
adb devices

echo ""
echo "📱 Installation Options:"
echo ""
echo "1. Install via USB (device must be connected)"
echo "2. View download link for manual install"
echo "3. Exit"
echo ""

read -p "Select option (1-3): " choice

case $choice in
    1)
        echo ""
        echo "Installing APK on connected device..."
        adb install -r "$APK_FILE"

        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Installation successful!"
            echo "📱 Find 'Captea Platform' in your app drawer"
        else
            echo ""
            echo "❌ Installation failed. Make sure:"
            echo "   - USB debugging is enabled"
            echo "   - Device is connected"
            echo "   - Unknown sources is enabled"
        fi
        ;;
    2)
        echo ""
        echo "📥 Download Link:"
        echo "https://expo.dev/artifacts/eas/egzukAZyWRTNveR4Nepr2W.apk"
        echo ""
        echo "📋 Instructions:"
        echo "1. Open this link on your Android phone"
        echo "2. Download the APK"
        echo "3. Enable 'Install unknown apps' in Settings"
        echo "4. Install and launch"
        ;;
    3)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "  Installation Complete!"
echo "======================================"
