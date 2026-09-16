import { useState, useEffect } from "react";

function App(){
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks`).then(res => res.json()).then(data => {
      console.log(data)
      setTasks(data.tasks)
    }).catch(err => console.log(err))
  }, [])

  return(
    <div className="text-2xl font-bold p-6">{tasks.length} tasks loaded</div>
  )
}

export default App