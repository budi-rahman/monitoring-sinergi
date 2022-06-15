import styles from '../../styles/Penyuluhan.module.css'
import Sidebar from '../../components/Sidebar'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


const Penyuluhan = ({ id }) => {
    const [dataPengaduan, setDataPengaduan] = useState([])
    const [respone, setRespone] = useState()
    const [token, setToken] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isRespone, setIsRespone] = useState(false)
    const [rolePick, setRolePick] = useState()
    const [daftarPIC, setDaftarPIC] = useState([])

    const router = useRouter()

    const changeURL = (id) => {
        return id.replaceAll("-", "/")
    }

    const handleSubmit = async() => {
        let data = {
            "no_pengaduan": dataPengaduan.no_pengaduan,
            "pic": rolePick,
            "respone": respone
        }

        let post = await SinergiAPi.Pengaduan.UpdatePengaduan({ token: token, data: data })
        let res = await post.json()
        if (res.status == 200) {
            // kalau sukses tampilannya gimana
            router.push('/pengaduan')
            console.log(res)
        } else {
            // kalau gagal gimana
            console.log(res)
        }
    }

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {

            setToken(token)
            let fetch = await SinergiAPi.Pengaduan.GetPengaduan({ token: token, id: changeURL(id) })
            let res = await fetch.json()

            if (fetch.status == 200) {
                if (res.data.status == true) {
                    setIsRespone(true)
                }
                setDataPengaduan(res.data)
                setLoading(false)
            } else {
                // lw buat kalau gagal fetch gimana, pop up atau gimana
            }
        }
    }, [])

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {

            setToken(token)
            let fetch = await SinergiAPi.Pengaduan.PengaduanPIC({ token: token })
            let res = await fetch.json()
            if (fetch.status == 200) {
                console.log(res.data)
                // kalau sukses tampilannya gimana
                setDaftarPIC(res.data)
                setRolePick(res.data[0].id)
            } else {
                // kalau gagal gimana
                console.log("gagal masuk sini")
            }
        }
    }, [])

    return (
        <>
            {isLoading ? <></> :
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.title}>
                        <h5>Laporan Pengaduan</h5>
                    </div>
                    <div className={styles.formContainer}>
                        <form>
                            <div className="mb-1">
                                <label className="form-label">Nama Pelapor</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={dataPengaduan.name} readOnly />
                            </div>
                            <div className="mb-1">
                                <label className="form-label">Nomor Pengaduan</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.no_pengaduan} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">No Identitas</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.nik} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Isi Pengaduan</label>
                                <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.report} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">PIC</label>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setRolePick(e.target.value)}>
                                    {daftarPIC.map((value, index) => (
                                        <option key={index} value={value.id}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                            {isRespone ?
                                <div className="mb-3">
                                    <label className="form-label">Hasil Laporan</label>
                                    <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.respone} readOnly/>
                                </div>
                                :
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Hasil Laporan</label>
                                        <textarea type="email" className="form-control" id="exampleInputPassword1" onChange={(e) => setRespone(e.target.value)} />
                                    </div>
                                    <div className="btn btn-primary" onClick={() => handleSubmit()}>Submit</div>
                                </>
                            }
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default Penyuluhan


export async function getServerSideProps(context) {

    const { id } = context.params
    return {
        props: { id },
    }

}