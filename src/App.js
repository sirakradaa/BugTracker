import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import BugListTable from './BugListTable';

const LOCAL_STORAGE_KEY = 'bugtrackerApp.bugList'

function App() {
    const [newBugDescription, SetNewBugDescription] = useState('');
    const [newBugPriority, setNewBugPriority] = useState('Medium');
    const [bugList, setBugList] = useState([]);

    useEffect(() => {
      document.title = "Bug Tracker"
   }, []);

  useEffect(() => {
    const storedBugList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedBugList) setBugList(storedBugList)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bugList))
  }, [bugList])
    
    const addBug = (event: FormEvent) => {
      event.preventDefault();
      const newBug:IBug = {
        id: uuid(),
        description: newBugDescription,
        priority: newBugPriority
      }

      setBugList([
        ...bugList,
        newBug
      ]);

      SetNewBugDescription('');
      setNewBugPriority('Medium');
    };
    
    const deleteBug = (id: string) => {
      const bugs = bugList.filter(bug => bug.id !== id);

      setBugList(bugs);
    };


  return (
    <div className="App">
      <h1>Bug Tracker</h1>
      <BugListTable bugs={bugList} onDeleteBug={(id: string) => deleteBug(id)} />
      <form className="add-new-bug-form" onSubmit={addBug}>
        <label htmlFor="newBugDescription">
        New bug description: 
        </label>
        <input data-testid="newBugDescription" type="text" id="newBugDescription" value = {newBugDescription} onChange={event => SetNewBugDescription(event.target.value)}/>
        <label htmlFor="newBugPriority">
        New bug priority:
        </label>
        <select id="newBugPriority" value={newBugPriority} onChange={event => setNewBugPriority(event.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button data-testid="addBtn" type="submit">Add New Bug</button>
      </form>

    </div>
  );
}

export default App;
