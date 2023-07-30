# Icon Pack Extension Template

Template for creating a **Component Extension** for [Karbonized](https://github.com/yossThDev/karbonized) based on a set of Images (.svg)

## ⚠️ Requirements

* NodeJS
* Bash
* zip

## 🏗️ Building

* Copy the images that you want to include in the extension to the images folder

* Edit the properties of the *info.json* file with the properties of your new extension

* Change Name Property on bash.sh and run it

``` bash
bash run pack.sh
```

## 🔌 Installing The New Extension

Copy the generated compressed file (*MyExtension.zip for example*) to **Karbonized Extensions** Folder

* **Windows**: C:\Users\USER\AppData\Local\karbonized\extensions\
* **Linux**: /home/USER/.config/karbonized/extensions/
* **Mac**: /Users/USER/Library/Application Support/karbonized/extensions/
