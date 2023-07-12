async function save(event)
{
    try{
    event.preventDefault()
    var email = event.target.email.value
    console.log(email)
    const forgot = await axios.post('http://3.108.220.147:3000/forgotPassword',{email})
    console.log(forgot)
   // const a = await axios.get('http://localhost:3000/resetpassword')
}
catch(err){
    console.log(err)
}
}

