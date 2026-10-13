// 13-10-2026
/// <reference types="node" />

//npx tsx 19_05_Read_Write_FS.ts  - executing by this command

import fs from 'fs';
import path from 'path';

// Always build paths from __dirname. A bare '.19_20_Users.json' resolves
// against the working directory, so it breaks when run from elsewhere.
const filePath = path.join(__dirname, '19_02_Users.json');
console.log('File path: ',filePath);

const fileData = fs.readFileSync(filePath, 'utf-8');
const userDataJSObject = JSON.parse(fileData);
console.log(userDataJSObject);

console.log(userDataJSObject.username);
console.log(userDataJSObject.password);

// Writing Data to a JSON File

const user = {
    name : "Kevin",
    role : "Voter"
};

const jsonData = JSON.stringify(user);
fs.writeFileSync('output.json', jsonData);  // ouput.json file wiil be created
console.log('JSON file created successfully')