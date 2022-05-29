import styles from '../styles/Sidebar.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router'
import cookies from '../lib/cookies';
const Sidebar = () => {

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
                        <a className={styles.link} aria-current="page" href="#">
                        <Link href='/user/add'>
                            Penambahan User
                        </Link>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={styles.link} aria-current="page" href="#">
                        <Link href='/data/'>
                            User Aktif
                        </Link>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={styles.link} aria-current="page" href="#">
                        <Link href='/pengaduan/'>
                            Pengaduan
                        </Link>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={styles.link} aria-current="page" href="#">
                        <Link href='/penyuluhan/'>
                            Penyuluhan
                        </Link>
                        </a>
                    </li>
                <li className="nav-item">
                    <a className={styles.link}>Upload Berita</a>
                </li>
                <li class="nav-item">
                    <a className={styles.link} onClick={handleLogout}>Logout</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar