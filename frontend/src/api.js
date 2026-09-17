const TASKS_URL = `${import.meta.env.VITE_API_URL}/api/v1/tasks`
const AUTH_URL = `${import.meta.env.VITE_API_URL}/api/v1/auth`

const getToken = () => localStorage.getItem('token') //helper func to avoid repetition

const handleResponse = async (res) => {
    if(!res.ok){
        const err = await res.json()
        throw new Error(err.msg || 'Something went wrong')
    }
    return res.json()
}

const register = async (userData) => {
    const res = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    })
    return handleResponse(res)
}

const login = async (userData) => {
    const res = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    })
    return handleResponse(res)
}

const getTasks = async () => {
    const token = getToken()
    const res = await fetch(TASKS_URL, {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    })
    return handleResponse(res)
}
const createTask = async (data) => {
    const token = getToken()
    const res = await fetch(TASKS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
    })
    return handleResponse(res)
}
const updateTask = async (id, data) => {
    const token = getToken()
    const res = await fetch(`${TASKS_URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
    })
    return handleResponse(res)
}
const deleteTask = async (id) => {
    const token = getToken()
    const res = await fetch(`${TASKS_URL}/${id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`}})
    return handleResponse(res)
}

export {register, login, getTasks, updateTask, createTask, deleteTask}