"use strict"
const path = require('path');
const _root = path.resolve(__dirname, '../..');
const rimraf = require('rimraf');
const packager = require('electron-packager');
const electronInstaller = require('electron-winstaller');
// 已编译源码目录
const buildPath = path.resolve(_root,"./output/electron/build");
// 打包发布目录
const distPath = path.resolve(_root,"./output/electron/dist");

rimraf(path.resolve(_root, distPath), function (error) {
    if (error) return console.error('删除output/electron目录失败！', error);
    console.log("已删除output/electron/dist目录");
    console.log("开始打包程序!");
    console.log(path.join(buildPath,"icon.ico"));
    packager({
        "name":"myTestApp",
        "app-copyright":"版权信息",
        "app-version":"0.0.1",
        "arch":"all",
        "platform":"win32",
        // "asar":true,
        "dir":buildPath,
        "out":distPath,
        "icon":path.join(buildPath,"icon.ico")
    }, function done_callback(err, appPaths) {
        if (error) return console.error('打包程序失败！', error);
        console.log("打包完成!请使用innoSetup或NSIS制作安装包");
        /*let resultPromise = electronInstaller.createWindowsInstaller({
            appDirectory: path.join(distPath, "app-win32-x64"),
            outputDirectory: path.join(distPath, "installer"),
            iconUrl:path.join(buildPath,"icon.ico"),
            loadingGif:path.join(buildPath,"loading.gif"),
            authors: 'My App Inc.',
            exe: 'app.exe'
        });
        resultPromise.then(() => console.log("生成安装包成功!"), (e) => console.log(`生成安装包失败！ ${e.message}`));*/
    });
});
