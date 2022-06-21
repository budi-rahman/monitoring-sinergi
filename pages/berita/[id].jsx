import styles from '../../styles/DetailBerita.module.css'
import Sidebar from '../../components/Sidebar'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

const DetailBerita = ({ id }) => {
    const [detailBerita, setDataBerita] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(async () => {
    //     let token = cookies.get("token")
    //     if (token == undefined) {
    //         router.push("/")
    //     } 
    //     setIsLoading(false)
    // }, [])

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {
            let fetch = await SinergiAPi.Berita.GetBerita({ token: token, id: id })
            let res = await fetch.json()
            console.log(fetch)
            console.log(res)
            setDataBerita(res.data)
        }
        setIsLoading(false)
    }, [])

    return(
        <>
            {isLoading ? <></> :
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles.title}>
                        <h3>Daftar Berita</h3>
                    </div>
                    <div className={styles.formContainer}>
                        <form>
                            {/* <div className="mb-1">
                                <label className="form-label">ID</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={detailBerita.id} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user-edit"></i>
                                    </span>
                                <InputText  value={detailBerita.id} readOnly />
                                </div>
                            </div>
                            {/* <div className="mb-1">
                                <label className="form-label">Judul</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={detailBerita.title} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user-edit"></i>
                                    </span>
                                    <InputText  value={detailBerita.title} readOnly />
                                </div>
                            </div>
                            {/* <div className="mb-3">
                                <label className="form-label">Tanggal</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={detailBerita.time} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user-edit"></i>
                                    </span>
                                    <InputText  value={detailBerita.time} readOnly />
                                </div>
                            </div>
                            {/* <div className="mb-3">
                                <label className="form-label">Isi Berita</label>
                                <textarea type="email" className="form-control" id="exampleInputPassword1" value={detailBerita.text} readOnly />
                            </div> */}
                            <div className="col-12 md:col-4">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user-edit"></i>
                                    </span>
                                    <InputTextarea rows={5} cols={30} autoResize value={detailBerita.text} readOnly />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default DetailBerita

export async function getServerSideProps(context) {

    const { id } = context.params

    return {
        props: { id },
    }

}