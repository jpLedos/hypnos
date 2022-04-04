import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';
import Title from '../components/Title'
import { getAllUsers, deleteOneUser } from '../services/ApiUsers'
import Auth from '../contexts/Auth'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const Users = () => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const {isAuthenticated} =  useContext(Auth);
    
    const navigate = useNavigate();
   
    useEffect(() => {
        getMyUsers();
    }, []);
    
    
    const getMyUsers = async()=> {
        try{      
            const myUsers = await getAllUsers();
            setUsers(myUsers)
            setLoading(false)
        }catch({ response }) {
            console.log(response.data.status)
            if(response.status===401){
                navigate('/');
            }
            setLoading(false);
        }
  
    };
    
    const deleteUser = async ($id) => {
        setLoading(true)
        const delUser = await deleteOneUser($id);
        getMyUsers()
        setLoading(false)
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deleteUser(e.target.name)
        }
    } ;

  return (
    <Fragment>
        <Title>Les gérants</Title>
        <section className="d-md-flex p-0 m-0" >   
            <div className="bg-light p-4 "> 

                <input className = "mb-3" onChange={(e)=>handleSearchChange(e)} value={search} placeholder="Recherche" id="search" type="text" />
                {!loading  ?
                <table className="table-responsive-md table-hover w-75" style={{minWidth : '500px', maxWidth : '800px'}}>
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom & Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(user => (user.lastname.match(search) && user.roles.includes("ROLE_MANAGER")))
                        .map((FilteredUser) => {
                            return (
                                <tr key={FilteredUser.id}>
                                    <th scope="row">{FilteredUser.id}</th>
                                    <td>{FilteredUser.lastname} {FilteredUser.firstname}</td>
                                    <td>{FilteredUser.email}</td>
                                    <td className="d-sm-flex">
                                        <Link className="nav-link" to = {`/user/${FilteredUser.id}`}  >
                                            <img className="icon" src={edition} alt="edition" />
                                            <span className="visually-hidden">(current)</span>
                                        </Link>
                                        {
                                        FilteredUser.hotels.length === 0 ?
                                        <div onClick={(e)=>clickDelete(e)} className="btn nav-link"  >
                                            <img className="icon" src={bin} alt="bin" name={FilteredUser.id} />
                                            <span className="visually-hidden">(current)</span>
                                        </div> 
                                        :
                                        <div>N/A</div>
                                        }
                                     
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                :
                <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
            </div>
        </section>
        <div className="d-flex justify-content-center">
            <Link className="btn btn-light m-3 " to="/user">Créer un nouveau gérant</Link>
        </div>

    </Fragment>
  )
}

export default Users