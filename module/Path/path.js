
// const path=require('path');
// 
// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));


import path from 'path'

import {fileURLToPath} from 'url'

const _filename=fileURLToPath(import.meta.url);
console.log(_filename);

const _dirname=path.dirname(_filename);
console.log(_dirname);

console.log(path.basename(_filename));
console.log(path.extname(_filename));