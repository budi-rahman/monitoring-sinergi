import styles from '../../styles/Adduser.module.css';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';


const AddUser = () => {

    const [name, setName] = useState()
    const [username, setUserName] = useState()
    const [email, setEmail] = useState()
    const [nik, setNik] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState(2)
    const [noHP, setNoHP] = useState()

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
                <h5>Form Tambah User</h5>
            </div>
            <div className={styles.formContainer}>
                <form>
            
                    <div class="mb-1">
                        <label for="exampleInputEmail1" className="form-label">Nama Lengkap</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="mb-1">
                        <label for="exampleInputPassword1" className="form-label">Username</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div class="mb-1">
                        <label for="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputPassword1" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="mb-1">
                        <label for="exampleInputPassword1" className="form-label">NIK</label>
                        <input type="telp" class="form-control" id="exampleInputPassword1" onChange={(e) => setNik(e.target.value)}/>
                    </div>
                    <div class="mb-1">
                        <label for="exampleInputPassword1" className="form-label">No Handphone</label>
                        <input type="telp" class="form-control" id="exampleInputPassword1" onChange={(e) => setNoHP(e.target.value)}/>
                    </div>
                    <div class="mb-1">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Role</label>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setRole(e.target.value)}>
                            <option value={role} selected>User</option>
                            <option value={3}> Staff</option>
                            <option value={1}>Admin</option>
                        </select>
                    </div>
                    <div class="btn btn-primary" onClick={() => handleAddUser()}>Submit</div>
                </form>
            </div>
        </div>
    )
}

export default AddUser