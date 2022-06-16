import styles from '../../styles/PenyuluhanList.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ListPenyuluhan = () => {

    let router = useRouter()
    const [dataPenyuluhan, setDataPenyuluhan] = useState([])
    const [loading1, setLoading1] = useState(false);

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
            let fetch = await SinergiAPi.Penyuluhan.GetAllMateri({ token: token })
            console.log(fetch)
            let res = await fetch.json()
            setDataPenyuluhan(res.data)
        }
    }, [])

    const actionBodyTemplate = (value) => {
        return (
                <Button icon="pi pi-pencil" loading={loading1} className="p-button-rounded p-button-success mr-2" onClick={() => {router.push(`/penyuluhan/${value.id}`); onLoadingClick1()}}/>
        );
    }


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.table}>
                <h3>Daftar Penyuluhan</h3>
            <div className={styles.wrapper}>
                <Link href='/penyuluhan/create'>
                    <Button label="Buat Acara Penyuluhan" icon="pi pi-plus" iconPos="right" className="p-button-raised p-button-success mt-5"/>
                </Link>
            </div>
                {/* <table className="table">
                    <table className="table caption-top">
                        <caption>Daftar Penyuluhan</caption>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Materi Penyuluhan</th>
                                <th scope="col">PIC</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPenyuluhan.map((value, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.materi}</td>
                                    <td>{value.pic}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => router.push(`/penyuluhan/${value.id}`)}>Edit</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </table> */}
                <div className={styles.table}>
                    <div className="card">
                        <DataTable value={dataPenyuluhan} responsiveLayout="scroll">
                            <Column field="id" header="Nomor"></Column>
                            <Column field="materi" header="Materi Penyuluhan"></Column>
                            <Column field="pic" header="Pemateri"></Column>
                            <Column field="alamat" header="Lokasi Penyuluhan"></Column>
                            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}  header="Action"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPenyuluhan