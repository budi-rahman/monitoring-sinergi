import { useEffect, useState } from 'react'
import cookies from '../../lib/cookies';
import SinergiAPi from '../../lib/api';

export default function ResponPengaduan({id}) {

    const [token, setToken] = useState()
    const [daftarPIC, setDaftarPIC] = useState([])
    const [dataPengaduan, setDataPengaduan] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [isRespone, setIsRespone] = useState(false)
    const [isPIC, setIsPIC] = useState()
    const [rolePick, setRolePick] = useState()
    const [textRespone, setTextRespone] = useState()

    const [reportID, setReportID] = useState()


    const handleSubmit = async () => {
        // logic nya gimana ? harus set PIC dulu ? apa gimana ? apa dua dua nya di kirim ?


        // kirim respone text

        // let data = {
        //     "no_pengaduan": reportID,
        //     "respone": textRespone
        // }

        //  ganti ID nanti

        if (!textRespone) {
            // kasih keterangan harus isi respone
            console.log("isi")
            return
        }

        let data = {
            "no_pengaduan": reportID,
            "respone": textRespone
        }

        console.log(data)

        let sendRespone = await fetch("http://8.215.70.140:8000/report/updatestatus", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        })

        let resSendRespone = await sendRespone.json()

        if (resSendRespone.status == 200) {
            console.log(resSendRespone.data)
            // kalau sukses tampilannya gimana
        } else {
            // kalau gagal gimana
            console.log("gagal masuk sini")
        }


        // ganti PIC

        let dataPIC = {
            "no_pengaduan": reportID,
            "pic": rolePick
        }

        console.log(dataPIC)

        let sendUpdatePIC = await fetch("http://8.215.70.140:8000/report/updatepic", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(dataPIC)
        })

        let resSendUpdatePIC = await sendUpdatePIC.json()

        if (sendUpdatePIC.status == 200) {
            console.log(resSendUpdatePIC.data)
            // kalau sukses tampilannya gimana
        } else {
            // kalau gagal gimana
            console.log("gagal masuk sini")
        }


    }

    const changeURL = (id) => {
        return id.replaceAll("-", "/")
    }

    useEffect(async () => {

        let token = cookies.get("token")
        //let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTU0OTkyNDMsImlzcyI6MTB9.M7ryBegxtrf900erwsA1DwxhRPOQltjIeeSew7RXXGY"
        if (token == undefined) {
            router.push("/")

        } else {

            setToken(token)
            let fetchDataPIC = await SinergiAPi.Penyuluhan.GetPIC({ token: token })
            // let id = changeURL("0006/MU/15062022")
            setReportID(id)
            // ganti nanti pake yang change ID
            // let fetchDataPIC = await fetch("http://8.215.70.140:8000/penyuluhan/pic", {
            //     method: 'GET', // or 'PUT'
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'token': token
            //     },
            // })
            let resDataPIC = await fetchDataPIC.json()

            if (fetchDataPIC.status == 200) {
                console.log(resDataPIC.data)
                // kalau sukses tampilannya gimana
                setDaftarPIC(resDataPIC.data)
                setRolePick(resDataPIC.data[0].id)
            } else {
                // kalau gagal gimana
                console.log("gagal masuk sini")
            }

            let fetchDataPengaduan = await SinergiAPi.Pengaduan.GetPengaduan({ token: token, id: changeURL(id) })
            // let fetchDataPengaduan = await fetch(`http://8.215.70.140:8000/report?no_pengaduan=${id}`, {
            //     method: 'GET', // or 'PUT'
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'token': token
            //     },
            // })
            let resDataPengaduan = await fetchDataPengaduan.json()

            if (fetchDataPengaduan.status == 200) {
                console.log(resDataPengaduan.data)

                if (resDataPengaduan.data.status == false) {
                    setIsRespone(false)
                } else {
                    setIsRespone(true)
                }

                if (!resDataPengaduan.data.pic) {
                    setIsPIC(false)
                } else {
                    setIsPIC(true)
                }
                // kalau sukses tampilannya gimana
                setDataPengaduan(resDataPengaduan.data)
            } else {
                // kalau gagal gimana
                console.log("gagal masuk sini")
            }

            setLoading(false)
        }

        // code di atas diaktifkan nanti



    }, [])

    return (
        <>
            {isLoading ? <></> :
                <div className="">
                    {/* <Sidebar /> */}
                    <div>
                        <h5>Laporan Pengaduan</h5>
                    </div>
                    <div className="">
                        <form>
                            <br />

                            <div className="mb-1">
                                <label className="form-label">Nama Pelapor</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={dataPengaduan.name} readOnly />
                            </div>
                            <br />

                            <div className="mb-1">
                                <label className="form-label">Nomor Pengaduan</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.no_pengaduan} readOnly />
                            </div>

                            <br />

                            <div className="mb-3">
                                <label className="form-label">No Identitas</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.nik} readOnly />
                            </div>

                            <br />

                            <div className="mb-3">
                                <label className="form-label">Isi Pengaduan</label>
                                <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.report} readOnly />
                            </div>

                            <br />

                            {isPIC ?

                                <div className="mb-3">
                                    <label className="form-label">Isi Pengaduan</label>
                                    <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.pic} readOnly />
                                </div>
                                :
                                <div className="mb-3">
                                    <label className="form-label">PIC</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setRolePick(e.target.value)}>
                                        {daftarPIC.map((value, index) => (
                                            <option key={index} value={value.id}>{value.name}</option>
                                        ))}
                                    </select>
                                </div>

                            }

                            {isRespone ?
                                <div className="mb-3">
                                    <label className="form-label">Hasil Laporan</label>
                                    <textarea type="email" className="form-control" id="exampleInputPassword1" value={dataPengaduan.respone} readOnly />
                                </div>
                                :
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Hasil Laporan</label>
                                        <textarea type="email" className="form-control" id="exampleInputPassword1" onChange={(e) => setTextRespone(e.target.value)} />
                                    </div>
                                </>
                            }

                        </form>
                        <div className="btn btn-primary" onClick={() => handleSubmit()}>Submit</div>
                    </div>
                </div>
            }
        </>
    )
}


export async function getServerSideProps(context) {

    // const { id } = context.params
    // return {
    //     props: { id },
    // }

    // nanti diaktifin, masukin "id" juga nanti diatas, seperti file [id] lainnya

    return {
        props: {}
    }

}