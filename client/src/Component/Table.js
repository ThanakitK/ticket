import React,{useEffect, useState} from 'react'
import axios from 'axios'

export const Table = () => {
  const [ticketList, setTicketList] = useState([]);
  const [editing, setEditing] = useState(true);
  
  useEffect(() => {
    fetchData()
  })

  const fetchData =()=>{
    axios.get('http://localhost:3001/ticket').then((response) => {
      setTicketList(response.data);
    });
  }

  const handleEditClick = () => {
    setEditing(false);
  };

  const handleSaveClick = () => {
    setEditing(true);
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
            if (editing) {
              return (
                <tr key={key}>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>{val.contact}</td>
                  <td>{val.status}</td>
                  <td>{format}</td>
                  <td>{val.update_at}</td>
                  <button onClick={handleEditClick}>edit</button>
                </tr>
              );
            }else{
              return (
                <tr key={key}>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>
                    <input value={val.contact}></input>
                  </td>
                  <td>
                    <select value={val.status}>
                      <option>pending</option>
                      <option>accepted</option>
                      <option>resolved</option>
                      <option>rejected</option>
                    </select>
                  </td>
                  <td>{format}</td>
                  <td>{val.update_at}</td>
                  <button onClick={handleSaveClick}>save</button>
                </tr>
              );
            }
            
          })}
        </tbody>
      </table>
    </div>
  );
};
