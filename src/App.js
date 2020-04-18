import React, { useEffect, useState } from "react";
import api from 'services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data)
      }
    )
  }, [])

  async function handleAddRepository() {
    const newRepo = {
      title: `Desafio número ${new Date().getTime()}`,
      url: "www.github.com/teste",
      techs: ["ReactJS", "NodeJS"]
    }

    const savedRepo = await api.post('/repositories', newRepo)
    console.log(`SavedRepo: ${savedRepo.data}`)

    setRepositories([...repositories, savedRepo.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const newRepo = repositories.filter(repo => repo.id !== id)
    setRepositories(newRepo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
