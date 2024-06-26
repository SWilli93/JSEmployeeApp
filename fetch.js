import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config()

const myAPIkey = process.env.APIkey

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

try {
    const result = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${myAPIkey}`, requestOptions);
    const resultObj = await result.json();
    // console.log(JSON.stringify(resultObj, null, 2))
} catch (error) {
    console.error(`Could not fetch currency data`);
    throw err;
}

export {myAPIkey}
