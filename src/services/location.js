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
    const final_array = []
    for (let i = 1; i < arr.length; i++) {
        // accesing line by line
        const element = arr[i];
        // accesing values
        const lineData = element.split('\t');
        let obj = {
            location: {
                type: 'Point',
                coordinates: []
            }
        }
        for (let j = 0; j < lineData.length; j++) {
            const value = lineData[j];

            if (headers[j] === 'long') {
                obj.location.coordinates[0] = Number(value)
            } else if (headers[j] === 'lat') {
                obj.location.coordinates[1] = Number(value)
            }

            // if (headers[j] === 'population') {
            //     obj[headers[j]] = Number(value)
            // }
            // if (headers[j] === 'modified_at') {
            //     obj[headers[j]] = new Date(value)
            // }

            obj[headers[j]] = value
            delete obj.lat;
            delete obj.long;
            final_array.push(obj)

        }

    }
    console.log("final arr");
    return final_array

}

const saveLocationInDb = async () => {
    try {
        const data = await arrayToJson()
        console.log("inser start");
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