export function fetchAllProducts(){
    return new Promise(async(resolve)=>{
        const response = await fetch('http://localhost:3000/products')
        const data = await response.json()
        resolve({data})
    })
}

export function fetchProductsByFilters(filter) {
    let queryString = '';
    console.log(filter);
    
    for (let key in filter) {
      if (key !== '_sort') {
        queryString += `${key}=${encodeURIComponent(filter[key])}&`;
      }
    }
    
    if (filter._sort) {
      queryString += `_sort=${filter._sort}`;
    }

    const finalUrl = 'http://localhost:3000/products?' + queryString;
    
    return new Promise(async (resolve) => {
      const response = await fetch(finalUrl);
      const data = await response.json();
      resolve({ data });
    });
}
