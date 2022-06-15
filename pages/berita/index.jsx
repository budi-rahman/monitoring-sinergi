import styles from '../../styles/Berita.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';



const ListBerita = () => {

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
                        <caption>Daftar Berita</caption>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Judul</th>
                                <th scope="col">Waktu</th>
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
                                        <button type="button" className="btn btn-primary" onClick={() => router.push(`/pengaduan/${changeURL(value.no_pengaduan)}`)}>Edit</button>
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

export default ListBerita