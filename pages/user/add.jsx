import styles from '../../styles/Adduser.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { useRouter } from 'next/router'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const AddUser = () => {

    const [name, setName] = useState()
    const [username, setUserName] = useState()
    const [email, setEmail] = useState()
    const [nik, setNik] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState(2)
    const [noHP, setNoHP] = useState()
    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
      setLoading1(true);
  
      setTimeout(() => {
          setLoading1(false);
      }, 2000);
  }

    const handleAddUser = async() => {

        let userData = {

            "name": name,
            "username": username,
            "email": email,
            "password": password,
            "nik": nik,
            "role": parseInt(role),
            "no_handphone": noHP
        }
        
        let fetch = await SinergiAPi.User.Register(userData)
        let res = await fetch.json()
        if (fetch.status == 201) {
            console.log(res)
        } else {
            // check eerror
            console.log(res)
        }
    }

    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        }
    }, [])


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.title}>
                <h3>Tambah User</h3>
            </div>
            <div className={styles.formContainer}>
                <form>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user-edit"></i>
                            </span>
                        <InputText placeholder="Nama Lengkap" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <br/>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                        </div>
                     </div>
                     <br/>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-envelope"></i>
                            </span>
                            <InputText placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                     </div>
                     <br/>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-id-card"></i>
                            </span>
                            <InputText placeholder="NIK" onChange={(e) => setNik(e.target.value)} />
                        </div>
                     </div>
                     <br/>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-phone"></i>
                            </span>
                            <InputText placeholder="No. Handphone" onChange={(e) => setNoHP(e.target.value)} />
                        </div>
                    </div>
                    <br/>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <Password placeholder="Password" feedback={false} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <br/>
                    <div className="mb-3">
                        <select className={styles.option} onChange={(e) => setRole(e.target.value)}>
                            <option value={role} selected>User</option>
                            <option value={3}> Staff</option>
                            <option value={1}>Admin</option>
                        </select>
                    </div>
                    <br/>
                    <div className={styles.buttonContainer}>
                        <Button label="Tambah" icon="pi pi-plus" loading={loading1} iconPos="right" className="p-button-raised p-button-success mt-5" onClick={() => {onLoadingClick1(); handleAddUser();}}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser