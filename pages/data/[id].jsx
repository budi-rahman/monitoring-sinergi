import styles from '../../styles/EditUser.module.css';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';


const EditUser = ({ id }) => {

    let router = useRouter()
    const [token, setToken] = useState()
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [role, setRole] = useState()
    const [availableRole, setAvailableRole] = useState([])
    const [loading1, setLoading1] = useState(false);

    const onLoadingClick1 = () => {
        setLoading1(true);
    
        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    }

    const roleData = [{ "role": "Admin", "id" : 1 }, { "role": "User", "id" : 2 }, { "role": "Staff", "id" : 3 }]

    const handleChangeRole = async () => {
        userData = {
            "id": id,
            "role": parseInt(role)
        }
        let post = await SinergiAPi.User.Update({ token: token, data: userData })
        let res = await post.json()
        if (post.status == 200) {
            // berhasil
            router.push('/data')
        } else {
            // gagal
            console.log(res)
        }
    }
    useEffect(async () => {
        let token = cookies.get("token")
        if (token == undefined) {
            router.push("/")
        } else {
            setToken(token)
            let fetch = await SinergiAPi.User.GetOne({ token: token, id: id })
            let res = await fetch.json()
            if (fetch.status == 200) {
                setUserData(res.data)
                setRole(roleData.filter(user => user.role == res.data.role)[0].id)
                setAvailableRole(roleData.filter(user => user.role !== res.data.role))    
            } else {
                // gagal
            }
       
        }
        setIsLoading(false)
    }, [])

    return (

        <>
            {isLoading ? <></> :

                <>
                    <div className={styles.container}>
                        <Sidebar />
                        <div className={styles.title}>
                            <h3>Edit User</h3>
                        </div>
                        <div className={styles.formContainer}>
                            <form>
                                {/* <div className="mb-1">
                                    <label  className="form-label">Nama Lengkap</label>
                                    <input value={userData.nama} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled />
                                </div> */}
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user-edit"></i>
                                        </span>
                                        <InputText value={userData.nama} />
                                    </div>
                                </div>
                                <br/>
                                {/* <div className="mb-1">
                                    <label className="form-label">Email</label>
                                    <input value={userData.email} type="text" className="form-control" id="exampleInputPassword1" disabled />
                                </div> */}
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user-edit"></i>
                                        </span>
                                        <InputText value={userData.email} />
                                    </div>
                                </div>
                                <br/>
                                {/* <div className="mb-1">
                                    <label className="form-label">NIK</label>
                                    <input value={userData.ktp} type="number" className="form-control" id="exampleInputPassword1" disabled />
                                </div> */}
                                <div className="col-12 md:col-4">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user-edit"></i>
                                        </span>
                                        <InputText value={userData.ktp} />
                                    </div>
                                </div>
                                <br/>
                                <div className="mb-3">
                                    <select className={styles.option} aria-label="Default select example" onChange={(e) => setRole(e.target.value)}>
                                        <option value={role} selected>{userData.role}</option>
                                        {availableRole.map((value, index) => (
                                            <option value={value.id} key={index}>{value.role}</option>
                                        ))}
                                    </select>
                                </div>
                                <br/>
                                {/* <div className="btn btn-primary" onClick={() => handleChangeRole()}>Submit</div> */}
                                <Button label="Tambah" icon="pi pi-plus" loading={loading1} iconPos="right" className="p-button-raised p-button-success mt-5" onClick={() => {onLoadingClick1(); handleChangeRole();}}/>
                            </form>
                        </div>
                    </div>

                </>


            }
        </>

    )
}

export default EditUser



export async function getServerSideProps(context) {

    const { id } = context.params

    return {
        props: { id },
    }

}