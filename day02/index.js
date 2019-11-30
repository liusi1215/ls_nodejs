#! /usr/bin/env node

var program = require('commander');
var package = require('./package.json');


const inquirer = require('inquirer');
const fs = require('fs')

const userlist = require('./user.json');

const promptList = [{
    type: 'input',
    message: '设置一个用户名:',
    name: 'name'
}, {
    type: 'password',
    message: '请输入密码:',
    name: 'pwd'
}, {
    type: 'input',
    message: '请输入身份证号:',
    name: 'num'
}
]



inquirer.prompt(promptList).then(answers => {
    // console.log(answers); // 返回的结果
    let { name, pwd, num } = answers
    // console.log(name, pwd, num)

    let res = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (res.test(num)) {
        let obj1 = userlist.find(item => item.num == num)
        if (!obj1) {
            let obj = { name, pwd, num }
            userlist.push(obj)
            fs.writeFileSync('./user.json', JSON.stringify(userlist))
        }else{
            console.log("该用户已存在")
        }
    } else {
        console.log("该用户已存在")
    }

})










// program
//    .version(package.version,'-v,--version')
//    .parse(process.argv)

// program
//     .version('1.0.0')
//     .option('-a,--add','add something')
//     .option('-u,--update','update something')
//     .option('-r,--remove','remove somthing')
//     .parse(process.argv)

// console.log('You choose:');

// if(program.add) console.log(' add somthing')
// if(parogram.update) console.log(' update something')
// if(program.remove) console.log(' remove something')



// program
//     .version('1.0.0')
//     .option('--add-file','add a file')
//     .parse(process.argv);
// if(program.addFile) console.log('add a file')