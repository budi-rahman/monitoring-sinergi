import styles from '../../styles/Berita.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const listBerita = () => {
    let router = useRouter()
    const [dataBerita, setDataBerita ] = useState([])
    const [ loading1, setLoading1 ] = useState(false)

    const onLoadingClick1 = () => {
        setLoading1(true);
    
        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    }

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {
            let fetch = await SinergiAPi.Berita.GetAllBerita({ token: token })
            let res = await fetch.json()
            setDataBerita(res.data)
        }
    }, [])

    const actionBodyTemplate = (value) => {
        return (
                <Button icon="pi pi-pencil" loading={loading1} className="p-button-rounded p-button-success mr-2" onClick={() => {router.push(`/berita/${value.id}`); onLoadingClick1();}}/>
        );
    }

    return(
        <div className={styles.container}>
        <Sidebar />
        <div className={styles.table}>
        <h3>Daftar Pengaduan</h3>
        <div className={styles.wrapper}>
                <Link href='/berita/create'>
                    <Button label="Buat Berita" icon="pi pi-plus" iconPos="right" className="p-button-raised p-button-success mt-5"/>
                </Link>
            </div>
            <div className={styles.table}>
                <div className="card">
                    <DataTable value={dataBerita} responsiveLayout="scroll">
                        <Column field="id" header="ID"></Column>
                        <Column field="title" header="Judul"></Column>
                        <Column field="time" header="Tanggal"></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}  header="Action"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    )
}

export default listBerita