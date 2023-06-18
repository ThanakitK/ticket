import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'
export const Create = () => {

    const [ticketList, setTicketList] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const status = useState("");
    const create_at = useState("");
    const update_at = useState("");


    const addTicket = () =>{
        if(title==="" || description==="" || contact===""){
            swal("Warning!", "Please fill the blank!", "warning");
        }else{
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
            swal("Success!", "ticket create!", "success");
        }
        
    }

  return (
    <div className='container'>
        <form action='#'>
            <div className="form-row">
                <div className='input-data'>
                    <input type='text' autoComplete='off' required 
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    ></input>
                    <div className="underline"></div>
                    <label htmlFor="">Title</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' required 
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    ></input>
                    <div className="underline"></div>
                    <label htmlFor="">Description</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' required 
                    onChange={(e)=>{
                        setContact(e.target.value)
                    }}
                    ></input>
                    <div className="underline"></div>
                    <label htmlFor="">Contact information</label>
                </div>
            </div>
        </form>
        <button className='createBtn' onClick={addTicket}>Create a new ticket</button>
        <Link to='/show'>
            <button className='createBtn'>Table</button>
        </Link>
        
    </div>
  )
}
