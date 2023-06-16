import React,{useEffect, useState} from 'react'
import axios from 'axios'

export const Table = () => {
  const [ticketList, setTicketList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  
  useEffect(() => {
    fetchData()
  })

  const fetchData =()=>{
    axios.get('http://localhost:3001/ticket').then((response) => {
      setTicketList(response.data);
    });
  }

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    setEditingIndex(-1);
  };

  return (
    <div>
      <h1>Ticket table</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Contact information</th>
            <th>Status</th>
            <th>Create</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {ticketList.map((val, key) => {
            const format= new Date(val.create_at).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
            if (editingIndex === key) {
              const selectedStatus =(e)=>{
                val.status = e.target.value
              }
              const editContact =(e)=>{
                val.contact = e.target.value
              }

              return (
                <tr key={key}>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>
                    <input onChange={editContact} defaultValue={val.contact}></input>
                  </td>
                  <td>
                    <select onChange={selectedStatus} defaultValue={val.status}>
                      <option value="pending">pending</option>
                      <option value="accepted">accepted</option>
                      <option value="resolved">resolved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                  <td>{format}</td>
                  <td>{val.update_at}</td>
                  <button onClick={handleSaveClick}>save</button>
                </tr>
              );
            }else{
              return (
                <tr key={key}>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>{val.contact}</td>
                  <td>{val.status}</td>
                  <td>{format}</td>
                  <td>{val.update_at}</td>
                  <button onClick={() => handleEditClick(key)}>edit</button>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <a href='/'>create</a>
    </div>
  );
};
