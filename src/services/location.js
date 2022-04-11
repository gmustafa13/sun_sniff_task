const fs = require('fs')
const readline = require('readline')
const locationModel = require('../schemas/location')
const path = require('path')

const tsvToArray = async () => {
    /**
     * first method to read tsv
     */
    let data = await new Promise(async (resolve) => {
        console.time('start')
        const fileStream = fs.createReadStream(await path.join(__dirname, '../../public/cities_canada-usa.tsv'));
        const reader = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
        const tempArr = []
        reader.on('line', (line) => {
            tempArr.push(line)
        })
        reader.on('close', () => {
            resolve(tempArr)
        })
        console.timeEnd('start')
    })

    return data

    /**
     * *****secound method ****
     * 
     *   const reading = new Promise((resolve)=>{
            fs.readFile('./cities_canada-usa.tsv', (err, data) => {
                const tempArr = []
                if (err) {
                    console.log(err);
                } else {
                    // data.on('data', (line) => {
                    //     tempArr.push(line)
                    // })

                    // data.on('end', () => {
                    //     const finalData = Buffer.concat(tempArr)
                    // })
                    // resolve(finalData)
                    data = data.toString()
                    resolve(data)
                    // console.log("data",data);
                }
            })
        })
        return reading

     */
}

const arrayToJson = async () => {
    // calling tsv_array
    let arr = await tsvToArray();
    console.log("tsv to array end");

    //sclice header
    const headers = arr[0].split('\t');
    console.log("header created");
    arr.splice(0, 1)
    /**
     * 1. loop over arr from index 1
     * 2. while looping sepret by tab 
     * 3. create inner loop for tab sepreted array
     * 4. create a local object in step 1
     * 5. do data modeling in inner loop 
     * 6. outside inner loop push local object to an final_array arr
     * 7. final_array will contain array of object witch will be push in db
     * 
     */

    let final_array = []
    arr.forEach(async (element) => {
        const data = element.split('\t');
        let temp = await rowToObject(data, headers);
        final_array.push(temp)
    });
    return final_array

}
const rowToObject = async (data, headers) => {
    let objData = await headers.reduce((obj, nextKey, index) => {
        obj.location = {
            type: 'Point',
            coordinates: []
        }
        obj[nextKey] = data[index];
        obj.location.coordinates[0] = obj.long ? Number(obj.long) : 0
        obj.location.coordinates[1] = obj.lat ? Number(obj.lat) : 0
        return obj;
    }, {});
    delete objData.lat
    delete objData.long
    return objData
}

const saveLocationInDb = async () => {
    try {
        const data = await arrayToJson()
        console.log("inser start", data.length);
        const insertedData = await locationModel.insertMany(data);
        console.log("insert end");
        if (insertedData) {
            console.log("all document inserted ", insertedData.length);
            return true
        }
    } catch (error) {
        console.log("err", error);
        return error
    }

}
const getData = async (filter, sortobj) => {
    try {
        return await locationModel.find(filter).sort(sortobj);
    } catch (error) {
        return error
    }
}

const getDataWithPagination = async (filter, sortobj, paginationObj) => {
    try {
        const obj = {}
        let data = await locationModel.find(filter).sort(sortobj)
            .skip(paginationObj.offset)
            .limit(paginationObj.limit);
        /**
         * mongoose is not allowing to do .count , countDocuments in geo document
         * hance done this
         */
        let count = await (await locationModel.find(filter)).length
        if (data) {
            obj.data = data
            obj.totalCount = count
        }
        return obj
    } catch (error) {
        return error
    }
}


module.exports = {
    saveLocationInDb,
    getData,
    getDataWithPagination
}