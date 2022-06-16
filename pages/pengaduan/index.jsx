import styles from '../../styles/Userlist.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ListPengaduan = () => {

    let router = useRouter()
    const [dataPengaduan, setDataPengaduan] = useState([])
    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
      setLoading1(true);
  
      setTimeout(() => {
          setLoading1(false);
      }, 2000);
  }

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
    }, [])

    const actionBodyTemplate = (value) => {
        return (
                <Button icon="pi pi-pencil" loading={loading1} className="p-button-rounded p-button-success mr-2" onClick={() => {router.push(`/pengaduan/${changeURL(value.no_pengaduan)}`); onLoadingClick1();}}/>
        );
    }


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.table}>
            <h3>Daftar Pengaduan</h3>
                <div className={styles.table}>
                    <div className="card">
                        <DataTable value={dataPengaduan} responsiveLayout="scroll">
                            <Column field="no_pengaduan" header="Nomor Pengaduan"></Column>
                            <Column field="nama" header="Nama"></Column>
                            <Column field="nik" header="KTP"></Column>
                            <Column field="report" header="Laporan"></Column>
                            <Column field="response" header="Respon"></Column>
                            <Column field="pic" header="PIC"></Column>
                            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}  header="Action"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPengaduan