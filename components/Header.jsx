import styles from "../styles/Header.module.css"
import Image from "next/image"

const Header = () => {
    return(
        <div className={styles.container}>
           <div className={styles.picture}>
                <Image src='/img/Logo-Kepri.png' alt='' width={80} height={80}/>
           </div>
           <div className={styles.title}>
               <p className={styles.text}>
                   Sinergi
               </p>
               <p className={styles.text1}>Sistem Informasi Terintegrasi (Kejati Kepri)</p>
           </div>
        </div>
    )
}

export default Header