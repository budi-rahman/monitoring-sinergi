import styles from '../../styles/PenyuluhanList.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';


const ListUser = () => {

    let router = useRouter()
    const [dataPenyuluhan, setDataPenyuluhan] = useState([])

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {
            let fetch = await SinergiAPi.Penyuluhan.GetAllMateri({ token: token })
            let res = await fetch.json()
            setDataPenyuluhan(res.data)
        }
    }, [])


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.table}>
            <div className={styles.wrapper}>
                <Link href='/penyuluhan/create'>
                    <button type="button" className="btn btn-primary">Buat Penyuluhan</button>
                </Link>
            </div>
                <table className="table">
                    <table className="table caption-top">
                        <caption>Daftar Penyuluhan</caption>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Materi Penyuluhan</th>
                                <th scope="col">PIC</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPenyuluhan.map((value, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.materi}</td>
                                    <td>{value.pic}</td>
                                    <td>
                                        <i className="bi bi-pencil-square mr-5" onClick={() => router.push(`/penyuluhan/${value.id}`)}></i>
                                        <i className="bi bi-trash3"></i>
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