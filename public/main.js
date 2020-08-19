const url= "http://localhost:5001/rest-api-56b48/us-central1/api/pets"
//const url='http://localhost:5000/api/'


const darDeBaja= async id =>{
   event.target.parentElement.parentElement.remove()

    await fetch(`${url}/${id}/daralta`)
}



const fetchPets= async() =>{
    const response =await fetch(url)
    const json =await response.json()

    return json
}


const tableTemplate = ({_id,nombre, tipo,description}) =>
    `
     <tr>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${description}</td>
        <td><button onClick="darDeBaja('${_id}')">Dar de baja</button></td>
     </tr>      `

const handleSubmit = async e =>{
    e.preventDefault()
    const {nombre,tipo,description} =e.target

    const data={
        nombre : nombre.value,
        tipo :tipo.value,
        description: description.value,
    }
    nombre.value =''
    tipo.value=''
    description.value=''

    const response= await fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
    })
    const json=await response.json()
    const template =tableTemplate({
        ...data,
        _id: json,
    })
    const tabla=document.getElementById('tabla')
    tabla.insertAdjacentHTML('beforeend',template)
}


window.onload = async () =>{
    const petForm=document.getElementById('pet-form')
    petForm.onsubmit=handleSubmit

    const pets= (await fetchPets())

    const template= pets.reduce((acc,e1)=>
        acc+tableTemplate(e1),'')

    const tabla=document.getElementById('tabla')
    tabla.innerHTML=template


}