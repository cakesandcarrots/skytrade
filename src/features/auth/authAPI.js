export const createUser = async (userData)=>{
const response = await fetch('http://localhost:3000/users',{
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {'content-type': 'application/json'}
});
const data = await response.json()
return data; 

}