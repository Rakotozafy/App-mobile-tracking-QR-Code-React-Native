// const API = 'http://192.168.68.181:5000/mouvement'
// export const api = 'http://192.168.68.181:5000/'
// const apis = 'http://192.168.68.181:5000/mobile'
// export const url = 'http://192.168.68.181:5000/mobile'
// export const infinix = 'http://192.168.68.181:5000/mobile'

// const API = 'http://localhost:5000/mouvement'
// export const api = 'http://localhost:5000/'
// const apis = 'http://localhost:5000/mobile'
// export const url = 'http://localhost:5000/mobile'
// export const infinix = 'http://localhost:5000/mobile'

const API = 'http://192.168.234.181:5000/mouvement'
export const api = 'http://192.168.234.181:5000/'
const apis = 'http://192.168.234.181:5000/mobile'
export const url = 'http://192.168.234.181:5000/mobile'
export const infinix = 'http://192.168.234.181:5000/mobile'

export const getMouvements = async ()=>{
    const res = await fetch(API)
    return await res.json()
}

export const ajoutMouvement = async (newMouvement)=>{
    const res = await fetch(API, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMouvement)
            },
        )
    return await res.json()
}

export const deleteMouvement = async (id)=>{
    const res = await fetch(`${API}/${id}`,
        {
            method: 'DELETE'
        }
    )
    return await res.json()
}

export const getMouvement = async (id)=>{
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}

export const updatemouvement = async (id, newMouvement)=>{
    const res = await fetch(`${API}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMouvement)
            },
        )
    return await res.json()
}

//Mouvement

export const getLivraisons = async ()=>{
    const res = await fetch(apis)
    return await res.json()
}

export const getLivraison = async (id)=>{
    const res = await fetch(`${apis}/${id}`)
    return await res.json()
}


export const ajout = async (rest)=>{
    const res = await fetch(apis, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rest)
            },
        )
    return await res.json()
}

export const modifier = async (id, updatemouvement)=>{
    const res = await fetch(`${apis}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatemouvement)
            },
        )
    return await res.json()
}