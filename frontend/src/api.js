const URL = `${import.meta.env.VITE_API_URL}/api/v1/tasks`

const handleResponse = async (res) => {
    if(!res.ok){
        const err = await res.json()
        throw new Error(err.msg || 'Something went wrong')
    }
    return res.json()
}

const getTasks = async () => {
    const res = await fetch(URL)
    return handleResponse(res)
}
const createTask = async (data) => {
    const res = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return handleResponse(res)
}
const updateTask = async (id, data) => {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return handleResponse(res)
}
const deleteTask = async (id) => {
    const res = await fetch(`${URL}/${id}`, {method: 'DELETE'})
    return handleResponse(res)
}

export {getTasks, updateTask, createTask, deleteTask}