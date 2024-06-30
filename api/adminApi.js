/*eslint-disable*/
const API = 'http://localhost:5000/admin'

export const getAdmins = async ()=>{
    const res = await fetch(API)
    return await res.json()
}

export const ajoutAdmin = async (newAdmin)=>{
    const res = await fetch(API, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdmin)
            },
        )
    return await res.json()
}

export const deleteAdmin = async (id)=>{
    const res = await fetch(`${API}/${id}`,
        {
            method: 'DELETE'
        }
    )
    return await res.json()
}

export const getAdmin = async (id)=>{
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}

export const updateAdmin = async (id, newAdmin)=>{
    const res = await fetch(`${API}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdmin)
            },
        )
    return await res.json()
}