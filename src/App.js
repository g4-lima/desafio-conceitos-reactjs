import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "New Repo 2",
      url: "https://github.com/g4-lima/desafio-conceitos-nodejs",
      techs: [
        "NodeJS",
        "React"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositoty => (
        <li key={repositoty.id}>
          {repositoty.title}

          <button onClick={() => handleRemoveRepository(repositoty.id)}>
            Remover
          </button>
        </li>))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
