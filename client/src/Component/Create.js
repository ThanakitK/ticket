import React, {useEffect, useState} from 'react'
import axios from 'axios'
export const Create = () => {

    const [ticketList, setTicketList] = useState([]);
    useEffect(() => {
        fetchData()
    })

    const fetchData =()=>{
        axios.get('http://localhost:3001/ticket').then((response) => {
        setTicketList(response.data);
        });
    }
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const status = useState("");
    const create_at = useState("");
    const update_at = useState("");


    const addTicket = () =>{
        axios.post('http://localhost:3001/create', {
            title: title,
            description: description,
            contact: contact,
            status: status,
            create_at: create_at,
            update_at: update_at
        }).then(()=>{
            setTicketList([
                ...ticketList,
                {
                    title: title,
                    description: description,
                    contact: contact,
                    status: status,
                    create_at: create_at,
                    update_at: update_at
                }
            ])
        })
    }

  return (
    <div>
        <form>
            <div>
                <label>Title :</label>
                <br/>
                <input type='text' autoComplete='off' placeholder='Enter title' 
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}
                ></input>
            </div>
            <div>
                <label>Description :</label>
                <br/>
                <input type='text' autoComplete='off' placeholder='Enter description' 
                onChange={(e)=>{
                    setDescription(e.target.value)
                }}
                ></input>
            </div>
            <div>
                <label>Contact information :</label>
                <br/>
                <input type='text' autoComplete='off' placeholder='Enter contact information' 
                onChange={(e)=>{
                    setContact(e.target.value)
                }}
                ></input>
            </div>
            <button onClick={addTicket}>Create a new ticket</button>
        </form>
        <a href='/show'>table</a>
    </div>
  )
}
