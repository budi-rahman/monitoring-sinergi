import styles from '../../styles/Userlist.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useRouter } from 'next/router';
import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


const ListUser = () => {

    let router = useRouter()
    const [userData, setUserData] = useState([])
    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
      setLoading1(true);
  
      setTimeout(() => {
          setLoading1(false);
      }, 2000);
  }

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {
            let fetch = await SinergiAPi.User.GetAll({ token: token })
            let res = await fetch.json()
            setUserData(res.data)
        }
    }, [])

    const actionBodyTemplate = (value) => {
        return (
                <Button icon="pi pi-pencil" loading={loading1} className="p-button-rounded p-button-success mr-2" onClick={() => {router.push(`/data/${value.id}`); onLoadingClick1();}}/>
        );
    }

    return(
        <div className={styles.container}>
            <Sidebar/>
            {/* <div className={styles.table}> 
                <table className="table">
                <table className="table caption-top">
                <caption>Daftar User</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">KTP</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((value, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.nama}</td>
                        <td>{value.ktp}</td>
                        <td>{value.email}</td>
                        <td>{value.role}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => router.push(`/data/${value.id}`)}>Edit</button>
                        </td>
                    </tr>
                    ))}
          
                </tbody>
                
                </table>
                </table>
            </div> */}
            <div className={styles.table}>
            <h3>Daftar Pengguna</h3>
            {/* <div className={styles.app}>
                <input type="text" placeholder='Search...' className={styles.search}/>

            </div> */}
            <div className="card">
                <DataTable value={userData} responsiveLayout="scroll">
                    <Column field="id" header="ID"></Column>
                    <Column field="ktp" header="Nama"></Column>
                    <Column field="nama" header="KTP"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="role" header="Role"></Column>
                    <Column field="no_handphone" header="Phone"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}  header="Action"></Column>
                </DataTable>
            </div>
            </div>
        </div>
    )
}

export default ListUser