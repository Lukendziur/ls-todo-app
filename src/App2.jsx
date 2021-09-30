import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// to get the data from LocalStorage
const getLocalTasks = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState(getLocalTasks());
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      setError("Escriba algo por favor");
      console.log("Elemento vacío");
      return;
    }

    setTareas([...tareas, { id: nanoid(10), tarea }]); 


    setTarea("");
    setError(null);
  };
  const deleteTask = (id) => {
    const arrayFiltrado = tareas.filter((tarea) => tarea.id !== id);
    setTareas(arrayFiltrado);
  };
  const edit = (task) => {
    
    setModoEdicion(true);
    setTarea(task.tarea);
    setId(task.id);
  };
  const editarTarea = (e) => {
    e.preventDefault();
    
    if (!tarea.trim()) {
      console.log("elemento vacío");
      setError("Escriba algo por favor");
      return;
    }
    const arrayEditado = tareas.map((item) =>
     item.id === id ? { id, tarea } : tarea

    );
    
    //  console.log(`El array editado es: ${arrayEditado[1].tarea}`) // Este es el problema, no filtra bien.
     console.log(arrayEditado)
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(tareas)); 
     }, [tareas]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">Crea una tarea</li>
            ) : (
              tareas.map(task => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.tarea}</span>

                  <button
                    className="btn btn-danger btn-sm float-sm-end mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>

                  <button
                    className="btn btn-warning btn-sm float-sm-end"
                    onClick={() => edit(task)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}

            <input
              type="text"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
              className="form-control mb-2"
              placeholder="Ingrese tarea"
            />
            <div className="d-grid gap-2">
              {modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">
                  Agregar tarea
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
