import styles from '../../styles/Penyuluhan.module.css'
import Sidebar from '../../components/Sidebar'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Penyuluhan = ({ id }) => {

    const [dataPenyuluhan, setDataPenyuluhan] = useState()
    const [loading, setLoading] = useState(true)
    const [addPeserta, setAddPeserta] = useState()
    const [token, setToken] =useState()
    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
      setLoading1(true);
  
      setTimeout(() => {
          setLoading1(false);
      }, 2000);
    }

    const handleAddPeserta = async() => {
        let data = {
            "materi_id" : dataPenyuluhan.id,
            "nama_peserta" : addPeserta
        }
        
        let post = await SinergiAPi.Penyuluhan.PostPeserta({ token: token, data: data })
        let res = await post.json()
        if (res.status == 201) {
            // kalau sukses tampilannya gimana
            router.push('/penyuluhan')
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
            let fetch = await SinergiAPi.Penyuluhan.GetMateri({ token: token, id: id })
            let res = await fetch.json()
            if (fetch.status == 200) {
                if (res.data.status == true) {
                    setIsRespone(true)
                }
                setDataPenyuluhan(res.data)
                setLoading(false)
            } else {
                // lw buat kalau gagal fetch gimana, pop up atau gimana
            }
        }
    }, [])

    return (

        <>
            {loading ? <></> :

                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.title}>
                        <h5>Input Absensi</h5>
                    </div>
                    <div className={styles.formContainer}>
                        <form>
                            {/* <div className="mb-1">
                                <label className="form-label">Materi Penyuluhan</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={dataPenyuluhan.materi} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user-edit"></i>
                                </span>
                                    <InputText placeholder="Nama Lengkap" value={dataPenyuluhan.materi} readOnly />
                                </div>
                            </div>
                            <br/>
                            {/* <div className="mb-1">
                                <label className="form-label">Lokasi Penyuluhan</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={dataPenyuluhan.alamat} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user-edit"></i>
                                </span>
                                    <InputText placeholder="Nama Lengkap" value={dataPenyuluhan.alamat} readOnly />
                                </div>
                            </div>
                            <br/>
                            {/* <div className="mb-3">
                                <label className="form-label">Pemateri</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={dataPenyuluhan.pic} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user-edit"></i>
                                </span>
                                    <InputText placeholder="Nama Lengkap" value={dataPenyuluhan.pic} readOnly />
                                </div>
                            </div>
                            <br/>
                            {/* <div className="mb-3">
                                <label className="form-label">Input Absensi</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Nama Peserta" onChange={(e) => setAddPeserta(e.target.value)} />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user-edit"></i>
                                </span>
                                    <InputText placeholder="Nama Lengkap" onChange={(e) => setAddPeserta(e.target.value)} />
                                </div>
                            </div>
                            <br/>
                            <div className={styles.buttonContainer}>
                                <Button label="Tambah" icon="pi pi-plus" loading={loading1} iconPos="right" onClick={() => {onLoadingClick1(); handleAddPeserta();}}/>
                            </div>
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