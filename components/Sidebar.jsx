import styles from '../styles/Sidebar.module.css';
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import cookies from '../lib/cookies';
import { Button } from 'primereact/button';

const Sidebar = () => {

    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
      setLoading1(true);
  
      setTimeout(() => {
          setLoading1(false);
      }, 2000);
  }

    const handleLogout = () => {
        cookies.remove("token")
        cookies.remove("id")
        cookies.remove("user")
        cookies.remove("role")
        window.location.href = '/'
    }

    return(
        <div className={styles.container}>
            <ul className={styles.navbar}>
                    <li className="nav-item">
                        <Link href='/user/add'>
                        <Button label="Tambah Pengguna" icon="pi pi-plus" iconPos="right" className="p-button-raised p-button-success" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href='/data/'>
                        <Button label="Pengguna Aktif" icon="pi pi-user" iconPos="right" className="p-button-raised p-button-success" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href='/pengaduan/'>
                        <Button label="Pengaduan" icon="pi pi-pencil" iconPos="right" className="p-button-raised p-button-success" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href='/penyuluhan/'>
                        <Button label="Penyuluhan" icon="pi pi-book" iconPos="right" className="p-button-raised p-button-success" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href='/berita/'>
                        <Button label="Berita" icon="pi pi-upload"  iconPos="right" className="p-button-raised p-button-success" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Button label="Keluar" icon="pi pi-sign-out" loading={loading1} iconPos="right" className="p-button-raised p-button-danger" onClick={() => {onLoadingClick1(); handleLogout();}} />
                    </li>
            </ul>
        </div>
    )
}

export default Sidebar