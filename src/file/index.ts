const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

type TTreeNode = {
    path: string
    children?: TTreeNode[]
}

module.exports = {
    // p: path; dir:0|1
    _recursionTree(p: string, dir: 0 | 1) {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            const dirs:string[] = fs.readdirSync(p);
            const newDirs:TTreeNode[] = dirs
                .map((item) => ({ path: path.join(p, item) }))
                .filter((item:TTreeNode) => {
                    const stat = fs.statSync(item.path);
                    if (stat.isDirectory()) {
                        item.children = this._recursionTree(item.path, dir);
                        return true;
                    } else {
                        return !dir;
                    }
                });
            return newDirs;
        } else {
            chalk.red(p, ' is not a directory');
            return [];
        }
    },

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
    },

    /* 
    @desc       树形式列出目录下所有目录
    @params     p       string      绝对目录
    @result     TTreeNode[]         所有文件路径
    */
    listDirTree(p: string):TTreeNode[] {
        if (!fs.existsSync(p)) {
            chalk.red('no such file or directory: ', p);
            return [];
        }
        return this._recursionTree(p, 1);
    },
    /* 
    @desc       树形式列出目录下所有文件
    @params     p       string      绝对目录
    @result     TTreeNode[]         所有文件路径
    */
    listFileTree(p: string):TTreeNode[] {
        if (!fs.existsSync(p)) {
            chalk.red('no such file or directory: ', p);
            return [];
        }
        return this._recursionTree(p, 0);
    },
    /* 
    @desc       列表形式列出目录下所有文件
    @params     p       string      绝对目录
    @result     string[]            所有文件路径
    */
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