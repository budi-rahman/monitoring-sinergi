import styles from '../../styles/BuatPenyuluhan.module.css'
import Sidebar from '../../components/Sidebar'
import { useState, useEffect } from 'react'
import SinergiAPi from '../../lib/api'
import cookies from '../../lib/cookies'
import { useRouter } from 'next/router'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const CreatePenyuluhan = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState()
    const [materi, setMateri] = useState()
    const [alamat, setAlamat] = useState()
    const [rolePick, setRolePick] = useState()

    const [daftarPIC, setDaftarPIC] = useState([])
    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
      setLoading1(true);
  
      setTimeout(() => {
          setLoading1(false);
      }, 2000);
    }
    const router = useRouter()

    const handlePostMateri = async () => {

        let data = {
            "pic": rolePick,
            "materi": materi,
            "alamat": alamat
        }

        let post = await SinergiAPi.Penyuluhan.PostMateri({ token: token, data: data })
        let res = await post.json()
        console.log(post.status)
        if (post.status == 201) {
            // kalau sukses tampilannya gimana
            console.log(res)
            router.push('/penyuluhan')
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
                console.log(res.data)
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
                            {/* <div className="mb-1">
                                <label className="form-label">Materi Penyuluhan</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setMateri(e.target.value)} />
                            </div> */}
                            <h5>Materi Penyuluhan</h5>
                            <div className="sizes">
                                <InputText type="text" className="p-inputtext-md"  placeholder="Input Materi"  onChange={(e) => setMateri(e.target.value)}/>
                            </div>
                            {/* <div className="mb-1">
                                <label className="form-label">Lokasi Penyuluhan</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" onChange={(e) => setAlamat(e.target.value)} />
                            </div> */}
                            <h5>Lokasi Penyuluhan</h5>
                            <div className="sizes">
                                <InputText type="text" className="p-inputtext-md"  placeholder="Input Lokasi"  onChange={(e) => setAlamat(e.target.value)}/>
                            </div>
                            <h5>Pemateri</h5>
                            <div className="mb-3">
                                <select className={styles.option} onChange={(e) => setRolePick(e.target.value)}>
                                    {daftarPIC.map((value, index) => (
                                        <option key={index} value={value.id}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Button label="Submit" icon="pi pi-check" loading={loading1} iconPos="right" className="p-button-raised p-button-success mt-5" onClick={() => {onLoadingClick1(); handlePostMateri();}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default CreatePenyuluhan