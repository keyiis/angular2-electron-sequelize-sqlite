"use strict"
const path = require('path');
const rimraf = require('rimraf');
const builder = require("electron-builder");
const Platform = builder.Platform;
const resourcePath = path.resolve(__dirname,"./src/electron");
const buildPath = "./output/electron/build";
const distPath = "./output/electron/dist";
rimraf(path.resolve(__dirname, './output/electron/dist'), function (error) {
    if (error) return console.error('删除output/electron/dist目录失败！', error);
    builder.build({
        targets: Platform.WINDOWS.createTarget(null, builder.Arch.x64),
        devMetadata: {
            "build": {
                "productName": "田果的软件",
                "description": "此软件主要用于测试",
               
                "win": {
                    "icon":path.join(buildPath,"icon.ico"),
                    "loadingGif": path.join(buildPath,"loading.gif")
                    //"msi": true
                }
            },
            "directories":{
                "buildResources":buildPath,
                "app": buildPath,
                "output": distPath
            }
        }
    }).then(() => {
        // handle result
    }).catch((error) => {
        // handle error
        return console.error('构建出错！', error);
    });
});