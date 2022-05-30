import styles from '../../styles/Userlist.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';



const ListUser = () => {

    let router = useRouter()
    const [dataPengaduan, setDataPengaduan] = useState([])

    const changeURL = (url) => {
        return url.replaceAll("/", "-")
    }

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {
            let fetch = await SinergiAPi.Pengaduan.GetAllPengaduan({ token: token })
            let res = await fetch.json()
            setDataPengaduan(res.data)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.table}>
                <table className="table">
                    <table className="table caption-top">
                        <caption>Daftar Pengaduan</caption>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nomor Pengaduan</th>
                                <th scope="col">Nama Pengadu</th>
                                <th scope="col">No Identitas</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPengaduan.map((value, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.no_pengaduan}</td>
                                    <td>{value.nama}</td>
                                    <td>{value.nik}</td>
                                    <td>
                                        <i className="bi bi-pencil-square mr-5" onClick={() => router.push(`/pengaduan/${changeURL(value.no_pengaduan)}`)}></i>
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