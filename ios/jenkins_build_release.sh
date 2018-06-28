#!/bin/bash


# ../node_modules/.bin/rn-nodeify --hack --install
npm run build-ios

projectName="ReTacToe"
date_today=$(date +%Y%m%d)
buildVersionString=$( /usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" ReTacToe/Info.plist )
imageName="${projectName}_${date_today}_v${buildVersionString}".ipa

echo "formal"
echo "---------------------------------"
echo "Building release ipa..."
echo "Building release ipa imageName = "$imageName
echo "---------------------------------"
sed -i "" s/'ProvisioningStyle = Automatic;'/'ProvisioningStyle = Manual;'/g ReTacToe.xcodeproj/project.pbxproj
sed -i "" s/'CODE_SIGN_STYLE = Automatic;'/'CODE_SIGN_STYLE = Manual;'/g ReTacToe.xcodeproj/project.pbxproj
sed -i "" s/'DEVELOPMENT_TEAM = 6EAH6G3F2S;'/'DEVELOPMENT_TEAM = "";'/g ReTacToe.xcodeproj/project.pbxproj
xcodebuild clean -configuration Release
xcodebuild clean -project ReTacToe.xcodeproj -scheme ReTacToe -configuration Release

xcodebuild archive -project ReTacToe.xcodeproj -scheme ReTacToe -configuration Release -archivePath build/ReTacToe.xcarchive CODE_SIGN_IDENTITY="iPhone Distribution: Compal Electronics, INC. (6EAH6G3F2S)" PROVISIONING_PROFILE="f632afbd-9032-424f-b510-0e0e04657105"
xcodebuild -exportArchive -archivePath build/ReTacToe.xcarchive -exportOptionsPlist ./export/exportOptionsForRelease.plist -exportPath "`pwd`" -allowProvisioningUpdates
mv "`pwd`/ReTacToe.ipa" "`pwd`/Release_${imageName}"
