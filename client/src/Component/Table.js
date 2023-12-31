import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const Table = () => {
  const [ticketList, setTicketList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [sortTable, setSort] = useState("id");
  const [filterTable, setFilter] = useState("all");
  
  useEffect(() => {
    fetchData()
  })

  const fetchData =()=>{
    axios.get('http://localhost:3001/ticket', { params: {sort:sortTable, filter: filterTable}})
    .then((response) => {
      setTicketList(response.data);
      console.log(response.data);
    });

  }

  const sort =(e)=>{
    if(e.target.value === "Id"){
      setSort("id")
    }else if(e.target.value === "Status"){
      setSort("status")
    }else if(e.target.value === "Update"){
      setSort("update_at")
    }
    fetchData()
  }

  const filter =(e)=>{
    if(e.target.value==="All"){
      setFilter("all")
    }else if(e.target.value==="Pending"){
      setFilter("pending")
    }else if(e.target.value==="Accepted"){
      setFilter("accepted")
    }else if(e.target.value==="Resolved"){
      setFilter("resolved")
    }else if(e.target.value==="Rejected"){
      setFilter("rejected")
    }
    fetchData()
  }

  const handleEditClick = (index) => {
    const ticket = ticketList[index];
    setContact(ticket.contact);
    setStatus(ticket.status);
    setEditingIndex(index);
    
  };

  const handleSaveClick = () => {
    if (contact===ticketList[editingIndex].contact && status===ticketList[editingIndex].status) {
      setEditingIndex(-1);
    }else{
      axios.put('http://localhost:3001/update', {id: editingIndex, contact: contact, status: status})
      .then(() => {
        setEditingIndex(-1);
        fetchData();
      })
      setEditingIndex(-1);
    }
    
  };

  return (
    <div className='container'>
      <h1>Ticket table</h1>
      <div class="section-dropdown">
        <label>sort by : </label>
        <select onChange={sort}>
          <option value="Id">Id</option>
          <option value="Update">Update</option>
          <option value="Status">Status</option>
        </select>
        <label>filter by : </label>
        <select onChange={filter}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      <div className='table-wrapper'>
        <table className='fl-table' style={{width:""}}>
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
                    <td style={{width: "33%"}}>
                      <input onChange={editContact} value={contact}></input>
                    </td>
                    <td style={{width: "13%"}}>
                      <select style={{width: "95%"}} onChange={selectedStatus} value={status}>
                        <option value="pending">pending</option>
                        <option value="accepted">accepted</option>
                        <option value="resolved">resolved</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </td>
                    <td>{formatCreate}</td>
                    <td>{formatUpdate}</td>
                    <button className='editBtn' onClick={handleSaveClick}>save</button>
                  </tr>
                );
              }else{
                return (
                  <tr key={key}>
                    <td >{val.title}</td>
                    <td>{val.description}</td>
                    <td style={{width: "33%"}}>{val.contact}</td>
                    <td style={{width: "13%"}}>{val.status}</td>
                    <td>{formatCreate}</td>
                    <td>{formatUpdate}</td>
                    <button className='editBtn' onClick={() => handleEditClick(key)}>edit</button>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      
      <Link to='/'>
       <button className='createBtn'>Create</button>
      </Link>
    </div>
  );
};
