import React, { useEffect, useState } from 'react';

import Animals from './apifake/Animals';
import Owners from './apifake/Owners';

import IOwner from "./apifake/Interfaces/IOwner";
import IAnimal from "./apifake/Interfaces/IAnimal";


import "./style.css";

// chamadas de api fake
const ownersConstructor: Owners = new Owners();
const animalsConstructor: Animals = new Animals();




// animals.getByOwnerId(); // retorna promise

function App() {
  const [owners, setOwners] = useState<IOwner[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState(1)
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [allAnimals, setAllAnimals] = useState({})


  useEffect(() => {
    ownersConstructor.getAll().then(ownersList => {
      setOwners(ownersList)
    })
  }, [])

  useEffect(() => {
    animalsConstructor.getByOwnerId(Number(selectedOwnerId)).then(animal => setAnimals(animal))
  }, [selectedOwnerId])


  const handleSelectOnChange = (ownerId: string) => {
    setSelectedOwnerId(Number(ownerId))
  }

  const renderOwners = () => (
    owners.map(owner => {
      return <option value={owner.id} key={owner.id}>{owner.name}</option>
    })
  )

  const renderAnimals = () => (
    animals.map(animal => {
      return <option value={animal.id} key={animal.id}>{animal.name}</option>
    })
  )


  const requestAllAnimals = () => {
    const owner1 = animalsConstructor.getByOwnerId(1);
    const owner2 = animalsConstructor.getByOwnerId(2);
    const owner3 = animalsConstructor.getByOwnerId(3);
    const owner4 = animalsConstructor.getByOwnerId(4);

    Promise.all([owner1, owner2, owner3, owner4])
      .then(([result0, result1, result2, result3]) => {
        setAllAnimals({ [owners[0].name]: result0, [owners[1].name]: result1, [owners[2].name]: result2, [owners[3].name]: result3 })
      })

  }

  return (
    <div className="App">
      <section id="owners-section">
        <label htmlFor="owners">Donos:</label>
        <select id="owners" onChange={event => handleSelectOnChange(event.target.value)}>
          {renderOwners()}
        </select>
      </section>
      <section id="animals-section">
        <label htmlFor="animals">Animais:</label>
        <select id="animals">
          {renderAnimals()}
        </select>
      </section>
      <section id="report">
        <button onClick={requestAllAnimals}>Ordenar donos com mais animais</button>
        <table id="reportList">
          <thead>
            <tr>
              <th>Dono</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fulano 1</td>
              <td>2 animais</td>
            </tr>
            <tr>
              <td>Fulano 2</td>
              <td>1 animal</td>
            </tr>
            <tr>
              <td>Fulano 3</td>
              <td>3 animais</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
