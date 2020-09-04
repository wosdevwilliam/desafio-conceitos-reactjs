import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  //Array para amrmazenar informações
  //UseSate retorna um array com 2 posições
    //1. Variável com o seu valor inicial
    //2. Função para atualizarmos esse valor
    const [repositories, setRepositories] = useState ([]);

        //Dispar funções
    //1. Qual função disparar
    //2. Quando disparar -> Array vazio dispara quando exibir em tela
    useEffect(() => {
      api.get('/repositories').then(response => {
          setRepositories(response.data);
      })
  }, []);

  //Adcionando
  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: "Novo Projeto",
      url: "github.com",
      techs: ["React"]
    });

    //const repository = response.data;
    setRepositories([...repositories, response.data]);
  }


  //Removendo
  async function handleRemoveRepository(id) {
    // TODO
   await api.delete(`/repositories/${id}`);
   
   setRepositories(repositories.filter(
     repository => repository.id !== id
   ));
  }

  return (
    <div>
      <ul data-testid="repository-list">

          {repositories.map(repository => (
          <li key= {repository.id}> 
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          
          </li>))}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
