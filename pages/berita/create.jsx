import cookies from '../../lib/cookies'
import { useState, useEffect } from 'react';
import router from 'next/router'
import SinergiAPi from '../../lib/api'
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/BuatBerita.module.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export default function CreateNews() {
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState()
    const[image, setImage] = useState()
    const[title, setTitle] = useState()
    const[text, setText] = useState()
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
        }
        else{
            setToken(token)
        }
        setIsLoading(false)
    }, [])


    const handleCreateNews = async() => {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("text", text);
        formData.append("author", 8);
        
        console.log(formData)
        let fetch = await SinergiAPi.Berita.PostBerita({data: formData, token: token})
        let res = await fetch.json()
        if (fetch.status == 201) {
            console.log(res)
        } else {
            console.log(res)
        }
    }

  return (
    <>    
    <div>
        {isLoading ? <></> : <>
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.title}>
                <h3>Buat Berita</h3>
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <input type='file' className={styles.upload} onChange={(e) => setImage(e.target.files[0])}/>
                    <br/>
                    <div className={styles.newsTitle}>
                        <InputText  type="text"  className={styles.newsTitle}  placeholder="Input Judul"  onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <br/>
                    <div className={styles.newsTitle}>
                        <InputTextarea type="text"  className={styles.newsContent} placeholder="Input Materi"   onChange={(e) => setText(e.target.value)}/>
                    </div>
                    <br/>
                </form>
            </div>
            <div className={styles.button}>
                    <Button label="Submit" icon="pi pi-check" loading={loading1} iconPos="right" className="p-button-raised p-button-success mt-5" onClick={() => {onLoadingClick1(); handleCreateNews();}}/>
            </div>
        </div>
        </>
        }

    </div>
    </>

  )
}
