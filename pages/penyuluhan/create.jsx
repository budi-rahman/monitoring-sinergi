import styles from '../../styles/BuatPenyuluhan.module.css'
import Sidebar from '../../components/Sidebar'
import { useState, useEffect } from 'react'
import SinergiAPi from '../../lib/api'
import cookies from '../../lib/cookies'

const CreatePenyuluhan = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState()
    const [materi, setMateri] = useState()
    const [alamat, setAlamat] = useState()
    const [rolePick, setRolePick] = useState()

    const [daftarPIC, setDaftarPIC] = useState([])

    const handlePostMateri = async () => {

        let data = {
            "pic": rolePick,
            "materi": materi,
            "alamat": alamat
        }

        let post = await SinergiAPi.Penyuluhan.PostMateri({ token: token, data: data })
        let res = await post.json()
        if (res.status == 201) {
            // kalau sukses tampilannya gimana
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
            let fetch = await SinergiAPi.Penyuluhan.GetPIC({ token: token })
            let res = await fetch.json()
            if (fetch.status == 200) {

                // kalau sukses tampilannya gimana
                setDaftarPIC(res.data)
                setRolePick(res.data[0].id)
            } else {
                // kalau gagal gimana
                console.log("gagal masuk sini")
            }
        }

        setIsLoading(false)
    }, [])

    return (

        <>
            {isLoading ? <></> : <>
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.title}>
                        <h5>Buat Penyuluhan</h5>
                    </div>
                    <div className={styles.formContainer}>
                        <form>
                            <div className="mb-1">
                                <label className="form-label">Materi Penyuluhan</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setMateri(e.target.value)} />
                            </div>
                            <div className="mb-1">
                                <label className="form-label">Lokasi Penyuluhan</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" onChange={(e) => setAlamat(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pemateri</label>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setRolePick(e.target.value)}>
                                    {daftarPIC.map((value, index) => (
                                        <option key={index} value={value.id}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="btn btn-primary" onClick={() => handlePostMateri()}>Submit</div>
                        </form>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default CreatePenyuluhan