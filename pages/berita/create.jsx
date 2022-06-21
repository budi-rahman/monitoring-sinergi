import cookies from '../../lib/cookies'
import { useState, useEffect } from 'react';
import router from 'next/router'
import SinergiAPi from '../../lib/api'
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/BuatBerita.module.css'

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
                <form>
                    <input type='file' onChange={(e) => setImage(e.target.files[0])}/>
                    <input type="text"  onChange={(e) => setTitle(e.target.value)} />
                    <input type="text"  onChange={(e) => setText(e.target.value)} />
                    <input type="text"  onChange={(e) => setText(e.target.value)} />
                </form>
            <button onClick={handleCreateNews}>Submit</button>
            </div>

        </div>
        </>
        }

    </div>
    </>

  )
}
