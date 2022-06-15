import styles from '../../styles/Userlist.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';

const ListUser = () => {

    let router = useRouter()
    const [userData, setUserData] = useState([])

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

    return(
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.table}> 
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
            </div>
        </div>
    )
}

export default ListUser