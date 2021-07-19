const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = class FS {
    // p: path; dir:0|1
    _recursionTree(p: string, dir: 0 | 1) {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            let dirs = fs.readdirSync(p);
            dirs = dirs
                .map((item: string) => ({ path: path.join(p, item) }))
                .filter((item: { path: string, children?: string[] }) => {
                    const stat = fs.statSync(item.path);
                    if (stat.isDirectory()) {
                        item.children = this._recursionTree(item.path, dir);
                        return true;
                    } else {
                        return !dir;
                    }
                });
            return dirs;
        } else {
            chalk.red(p, ' is not a directory');
            return [];
        }
    }

    _recursionList(arr: string[], p: string) {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            const dirs = fs.readdirSync(p);
            dirs.forEach((item: string) => {
                this._recursionList(arr, path.join(p, item));
            });
        } else {
            arr.push(p);
        }
    }

    listDirTree(p: string) {
        if (!fs.existsSync(p)) {
            chalk.red('no such file or directory: ', p);
            return {};
        }
        return this._recursionTree(p, 1);
    }

    listFileTree(p: string) {
        if (!fs.existsSync(p)) {
            chalk.red('no such file or directory: ', p);
            return {};
        }
        return this._recursionTree(p, 0);
    }

    listFileList(p: string) {
        const paths: string[] = [];
        if (!fs.existsSync(p)) {
            chalk.red('no such file or directory: ', p);
            return;
        }
        this._recursionList(paths, p);
        return paths;
    }
}