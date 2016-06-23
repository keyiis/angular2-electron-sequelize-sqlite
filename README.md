#angular2-electron

#编译sqlite
参考自http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
查看electron-packager版本, 获得当前项目electron的版本
1.2.4
cd .\node_modules\sqlite3 进入sqlite3目录按步骤执行下面的命令
1、npm run prepublish 如果报错要安装nan,那么按提示在当前目录执行npm install nan@版本号，然后再次执行npm run prepublish。
2、node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.2-win32-x64
3、node-gyp rebuild --target=1.2.4 --arch=x64 --target_platform=win32 --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.2-win32-x64

#npm 使用说明
cnpm（cnpmjs.org）的包有时不是最新版本，可以点击sync与npm同步
有时无法使用npm remove删除包的原因
因为有时npm会将包实际安装在项目根目录下的node_modules/.npminstall下，而node_modules目录下的包文件夹仅是一个链接,可以尝试用管理员身份打开cmd，然后再执行npm remove 包名

npm安装包时如果node-gyp编译失败, 有下面两种方法：
1、在安装包时直接指定vc++的版本(前提是你已安装相应版本的vs) cnpm install --msvs_version=2015
2、在我的电脑-系统环境变量中设置GYP_MSVS_VERSION=2015

#typings 使用说明
由于被墙,因此有时typings install会无法安装模块，可以按以下步骤试试：
1、清空DNS缓存 ipconfig /flushdns
2、设置DNS 比如换成阿里云服务器设置的DNS 10.202.72.116 10.202.72.118
3、修改windows hosts文件C:\Windows\System32\drivers\etc\hosts 增加
104.24.112.177   api.typings.org
103.245.222.133  raw.githubusercontent.com

typings 搜索模块
npm run typings search 模块名称
typings 安装模块
npm run typings -- install dt~模块名称 --save --global

#typescript sequelize 定义文件参考
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/sequelize/sequelize-tests.ts

#webpack
build时会警告有同名的包，可能是npm时同一个包有不同的版本，会提示
There is another module with an equal name when case is ignored.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Rename module if multiple modules are expected or use equal casing if one module is expected.
可能是因为大小写导致的
var fluxxor = require('Fluxxor');    //should be require('fluxxor')

#electron-prebuilt electron打包必备
安装过程中要下载electron zip包，如果速度慢就去https://npm.taobao.org/mirrors/electron/下载对应版本然后放到当前用户目录下的.electron/下

#electron-packager 用于electron打包成asar,但并不能生成安装文件或zip包
命令格式: electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch>

必需的配置：
sourcedir          the base directory of the application source
下面二选一:
platform           all, or one or more of: darwin, linux, mas, win32 (comma-delimited if multiple)
arch               all, or one or more of: ia32, x64 (comma-delimited if multiple)
或者:
all                equivalent to --platform=all --arch=all

示例:        electron-packager ./ --platform=darwin --arch=x64
                   electron-packager ./ --all

可选的配置:
appname            the name of the app, if it needs to be different from the "productName" or "name"
                   in the nearest package.json

* All platforms *

app-copyright      human-readable copyright line for the app
app-version        release version to set for the app
asar               packages the source code within your app into an archive
asar-unpack        unpacks the files to app.asar.unpacked directory whose filenames regex .match
                   this string
asar-unpack-dir    unpacks the dir to app.asar.unpacked directory whose names glob pattern or
                   exactly match this string. It's relative to the <sourcedir>.
build-version      build version to set for the app
cache              directory of cached Electron downloads. Defaults to `$HOME/.electron`
                   (Deprecated, use --download.cache instead)
download           a list of sub-options to pass to electron-download. They are specified via dot
                   notation, e.g., --download.cache=/tmp/cache
                   Properties supported:
                   - cache: directory of cached Electron downloads. Defaults to `$HOME/.electron`
                   - mirror: alternate URL to download Electron zips
                   - strictSSL: whether SSL certs are required to be valid when downloading
                     Electron. Defaults to true, use --download.strictSSL=false to disable checks.
icon               the icon file to use as the icon for the app. Note: Format depends on platform.
ignore             do not copy files into app whose filenames regex .match this string
out                the dir to put the app into at the end. defaults to current working dir
overwrite          if output directory for a platform already exists, replaces it rather than
                   skipping it
prune              runs `npm prune --production` on the app
strict-ssl         whether SSL certificates are required to be valid when downloading Electron.
                   It defaults to true, use --strict-ssl=false to disable checks.
                   (Deprecated, use --download.strictSSL instead)
tmpdir             temp directory. Defaults to system temp directory, use --tmpdir=false to disable
                   use of a temporary directory.
version            the version of Electron that is being packaged, see
                   https://github.com/electron/electron/releases

* darwin/mas target platforms only *

app-bundle-id      bundle identifier to use in the app plist
app-category-type  the application category type
                   For example, `app-category-type=public.app-category.developer-tools` will set the
                   application category to 'Developer Tools'.
extend-info        a plist file to append to the app plist
extra-resource     a file to copy into the app's Contents/Resources
helper-bundle-id   bundle identifier to use in the app helper plist
osx-sign           (OSX host platform only) Whether to sign the OSX app packages. You can either
                   pass --osx-sign by itself to use the default configuration, or use dot notation
                   to configure a list of sub-properties, e.g. --osx-sign.identity="My Name"
                   Properties supported:
                   - identity: should contain the identity to be used when running `codesign`
                   - entitlements: the path to entitlements used in signing
                   - entitlements-inherit: the path to the 'child' entitlements

* win32 target platform only *

version-string     a list of sub-properties used to set the application metadata embedded into
                   the executable. They are specified via dot notation,
                   e.g. --version-string.CompanyName="Company Inc."
                   or --version-string.ProductName="Product"
                   Properties supported:
                   - CompanyName
                   - FileDescription
                   - OriginalFilename
                   - ProductName
                   - InternalName

