const { locationServices } = require('../services')

const create = async () => {
    return await locationServices.saveLocationInDb()
}

const getData = async (query) => {
    const { q, latitude, longitude, radius, sort } = query;
    let filterObj = {}
    let sortObj = {}
    const sortParams =['name','distance']
    if (q) {
        filterObj['name'] = {
            $regex: q, $options: "i"
        }
    }
    /**
     * if lat and long is there then filter accordingly
     * if not it will filter based on q if its provided
     */
    if ((latitude && longitude)  || (latitude && longitude && radius) ) {
        filterObj['location'] = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        Number(longitude),
                        Number(latitude)
                    ]
                },
                $maxDistance: radius ? Number(radius) : 4,
                $minDistance: 0
            }
        }
    }

    /**
     * if sort parametere provide it will query on that
     * if not default sort on name will implement
     */
    if(sortParams.includes(sort)){
        sortObj[sort]  = -1
    }else{
        sortObj.name = -1
    }
   return await locationServices.getData(filterObj,sortObj)

}

const getDataWithPagination = async(query)=>{
    const { q, latitude, longitude, radius, sort ,pageNumber ,pageSize } = query;

    let filterObj = {}
    let sortObj = {}
    const page = pageNumber && Number(pageNumber) !== 0 ? Number(pageNumber) : 1;
    const limit = pageSize ? Number(pageSize) : 10;
    let paginationObj = {
        page,
        limit,
        offset: (page -1) * limit
    }
    const sortParams =['name','distance']
    if (q) {
        filterObj['name'] = {
            $regex: q, $options: "i"
        }
    }
    /**
     * if lat and long is there then filter accordingly
     * if not it will filter based on q if its provided
     */
    if ((latitude && longitude)  || (latitude && longitude && radius) ) {
        filterObj['location'] = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        Number(longitude),
                        Number(latitude)
                    ]
                },
                $maxDistance: radius ? Number(radius) : 4,
                $minDistance: 0
            }
        }
    }

    /**
     * if sort parametere provide it will query on that
     * if not default sort on name will implement
     */
    if(sortParams.includes(sort)){
        sortObj[sort]  = -1
    }else{
        sortObj.name = -1
    }
   return await locationServices.getDataWithPagination(filterObj, sortObj, paginationObj)
}


module.exports = {
    create,
    getData,
    getDataWithPagination
}