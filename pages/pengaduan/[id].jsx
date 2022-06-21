import styles from '../../styles/Adduser.module.css'
import Sidebar from '../../components/Sidebar'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import router from 'next/router'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export default function ResponPengaduan({id}) {

    const [token, setToken] = useState()
    const [daftarPIC, setDaftarPIC] = useState([])
    const [dataPengaduan, setDataPengaduan] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [isRespone, setIsRespone] = useState(false)
    const [isPIC, setIsPIC] = useState()
    const [rolePick, setRolePick] = useState()
    const [textRespone, setTextRespone] = useState()
    const [loading1, setLoading1] = useState(false);
    const [reportID, setReportID] = useState()

    const onLoadingClick1 = () => {
        setLoading1(true);
    
        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    }

    const handleSubmit = async () => {

        if (!textRespone) {
            // kasih keterangan harus isi respone
            console.log("isi")
            return
        }

        let data = {
            "no_pengaduan": reportID,
            "respone": textRespone
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


        let dataPIC = {
            "no_pengaduan": reportID,
            "pic": rolePick
        }
        let sendUpdatePIC = await SinergiAPi.Pengaduan.UpdatePIC({ token: token, data: dataPIC })

        let resSendUpdatePIC = await sendUpdatePIC.json()

        if (sendUpdatePIC.status == 200) {
            console.log(resSendUpdatePIC.data)
            // kalau sukses tampilannya gimana
        } else {
            // kalau gagal gimana
            console.log("gagal masuk sini")
        }
    }

    const changeURL = (id) => {
        return id.replaceAll("-", "/")
    }

    useEffect(async () => {

        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")

        } else {

            setToken(token)
            let fetchDataPIC = await SinergiAPi.Penyuluhan.GetPIC({ token: token })

            setReportID(changeURL(id))
            let resDataPIC = await fetchDataPIC.json()

            if (fetchDataPIC.status == 200) {
                console.log(resDataPIC.data)
                // kalau sukses tampilannya gimana
                setDaftarPIC(resDataPIC.data)
                setRolePick(resDataPIC.data[0].id)
            } else {
                // kalau gagal gimana
                console.log("gagal masuk sini")
            }
            let fetchDataPengaduan = await SinergiAPi.Pengaduan.GetPengaduan({ token: token, id: changeURL(id) })
            let resDataPengaduan = await fetchDataPengaduan.json()

            if (fetchDataPengaduan.status == 200) {
                console.log(resDataPengaduan.data)

                if (resDataPengaduan.data.status == false) {
                    setIsRespone(false)
                } else {
                    setIsRespone(true)
                }

                if (!resDataPengaduan.data.pic) {
                    setIsPIC(false)
                } else {
                    setIsPIC(true)
                }
                // kalau sukses tampilannya gimana
                setDataPengaduan(resDataPengaduan.data)
            } else {
                // kalau gagal gimana
                console.log("gagal masuk sini")
            }

            setLoading(false)
        }

    }, [])

    return (
        <>
            {isLoading ? <></> :
                
                <div className={styles.container}>
                <Sidebar />
                <div className={styles.title}>
                    <h3>Tambah User</h3>
                </div>
                <div className={styles.formContainer}>
                    <form>
                
                        {/* <div className="mb-1">
                            <label className="form-label">Nama Lengkap</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)}/>
                        </div> */}
                        <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user-edit"></i>
                                </span>
                            <InputText value={dataPengaduan.name} readOnly />
                            </div>
                        </div>
                        {/* <div className="mb-1">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setUserName(e.target.value)}/>
                        </div> */}
                        <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText value={dataPengaduan.no_pengaduan} readOnly />
                            </div>
                         </div>
                        {/* <div className="mb-1">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputPassword1" onChange={(e) => setEmail(e.target.value)}/>
                        </div> */}
                        <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText value={dataPengaduan.nik} readOnly/>
                            </div>
                         </div>
                        {/* <div className="mb-1">
                            <label className="form-label">NIK</label>
                            <input type="telp" className="form-control" id="exampleInputPassword1" onChange={(e) => setNik(e.target.value)}/>
                        </div> */}
                        <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <InputTextarea rows={5} cols={30} value={dataPengaduan.report} readOnly autoResize />
                            </div>
                         </div>
                        {isPIC ?

                            // <div className="mb-3">
                            //     <label className="form-label">Isi Pengaduan</label>
                            //     <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.pic} readOnly />
                            // </div>
                            <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText value={dataPengaduan.pic} readOnly/>
                            </div>
                         </div>
                            :
                            <div className="mb-3">
                                <select className={styles.option} aria-label="Default select example" onChange={(e) => setRolePick(e.target.value)}>
                                    {daftarPIC.map((value, index) => (
                                        <option key={index} value={value.id}>{value.name}</option>
                                    ))}
                                </select>
                            </div>

                        }
                        {isRespone ?
                            // <div className="mb-3">
                            //     <label className="form-label">Hasil Laporan</label>
                            //     <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.respone} readOnly />
                            // </div>
                        //     <div className="col-12 md:col-4">
                        //     <div className="p-inputgroup">
                        //         <span className="p-inputgroup-addon">
                        //             <i className="pi pi-id-card"></i>
                        //         </span>
                                
                        //         <InputTextarea rows={5} cols={30} onChange={(e) => setTextRespone(e.target.value)} />
                        //     </div>
                        //  </div>
                        <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-id-card"></i>
                            </span>
                            <InputTextarea rows={5} cols={30} value={dataPengaduan.response} readOnly autoResize />
                        </div>
                     </div>
                            :
                            <>
                                {/* <div className="mb-3">
                                    <label className="form-label">Hasil Laporan</label>
                                    <textarea type="email" className="form-control" id="exampleInputPassword1" onChange={(e) => setTextRespone(e.target.value)} />
                                </div> */}
                            {/* <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <InputTextarea rows={5} cols={30} value={dataPengaduan.response} readOnly autoResize />
                            </div>
                         </div> */}
                         <div className="col-12 md:col-4">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                
                                <InputTextarea rows={5} cols={30} onChange={(e) => setTextRespone(e.target.value)} />
                            </div>
                         </div>
                            </>
                        }
                        <div className={styles.buttonContainer}>
                            <Button label="Submit" icon="pi pi-plus" loading={loading1} iconPos="right" className="p-button-raised p-button-success mt-5" onClick={() => {onLoadingClick1(); handleSubmit();}}/>
                        </div>
                    </form>
                </div>
            </div>
            }
        </>
    )
}


export async function getServerSideProps(context) {

    const { id } = context.params
    return {
        props: { id },
    }

    // nanti diaktifin, masukin "id" juga nanti diatas, seperti file [id] lainnya

}