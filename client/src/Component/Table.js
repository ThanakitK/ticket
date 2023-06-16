import React,{useEffect, useState} from 'react'
import axios from 'axios'

export const Table = () => {
  const [ticketList, setTicketList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  
  useEffect(() => {
    fetchData()
  })

  const fetchData =()=>{
    axios.get('http://localhost:3001/ticket').then((response) => {
      setTicketList(response.data);
    });
  }

  const handleEditClick = (index) => {
    const ticket = ticketList[index];
    setContact(ticket.contact);
    setStatus(ticket.status);
    setEditingIndex(index);
    
  };

  const handleSaveClick = () => {
    axios.put('http://localhost:3001/update', {id: editingIndex, contact: contact, status: status})
      .then(() => {
        setEditingIndex(-1);
        fetchData();
      })
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
            const formatCreate= new Date(val.create_at).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
            const formatUpdate= new Date(val.update_at).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
            if (editingIndex === key) {
              const selectedStatus =(e)=>{
                setStatus(e.target.value);
              }
              const editContact =(e)=>{
                setContact(e.target.value)
              }

              return (
                <tr key={key}>
                  <td>{val.title}</td>
                  <td>{val.description}</td>
                  <td>
                    <input onChange={editContact} value={contact}></input>
                  </td>
                  <td>
                    <select onChange={selectedStatus} value={status}>
                      <option value="pending">pending</option>
                      <option value="accepted">accepted</option>
                      <option value="resolved">resolved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                  <td>{formatCreate}</td>
                  <td>{formatUpdate}</td>
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
                  <td>{formatCreate}</td>
                  <td>{formatUpdate}</td>
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
