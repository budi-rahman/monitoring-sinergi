const SERVER_BASE_URL = `https://8.215.70.140:8000`


const Login = async(params) => {

    let url = `${SERVER_BASE_URL}/user/login`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
}

const Register = async(params) => {

    let url = `${SERVER_BASE_URL}/user/register`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
}

const Update = async(params) => {

    let url = `${SERVER_BASE_URL}/user/update`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        },
        body: JSON.stringify(params.data),
    })
}

const GetAll = async(params) => {

    let url = `${SERVER_BASE_URL}/user`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}

const GetOne = async(params) => {

    let url = `${SERVER_BASE_URL}/user/?id=${params.id}`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}


const User = {
    GetAll,
    Login,
    Register,
    Update,
    GetOne
}


// 

const PostMateri = async(params) => {

    let url = `${SERVER_BASE_URL}/penyuluhan`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        },
        body: JSON.stringify(params.data),
    })
}

const PostPeserta = async(params) => {

    let url = `${SERVER_BASE_URL}/penyuluhan/peserta`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        },
        body: JSON.stringify(params.data),
    })
}


const GetAllMateri = async(params) => {

    let url = `${SERVER_BASE_URL}/penyuluhan/all`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}

const GetMateri = async(params) => {

    let url = `${SERVER_BASE_URL}/penyuluhan?id=${params.id}`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}

const GetPIC = async(params) => {

    let url = `${SERVER_BASE_URL}/penyuluhan/pic`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}

const Penyuluhan = {
    GetAllMateri,
    GetPIC,
    PostMateri,
    GetMateri,
    PostPeserta
}


// 

const GetAllPengaduan = async(params) => {

    let url = `${SERVER_BASE_URL}/report/all`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}


const GetPengaduan = async(params) => {

    let url = `${SERVER_BASE_URL}/report?no_pengaduan=${params.id}`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}

const UpdatePengaduan = async(params) => {

    let url = `${SERVER_BASE_URL}/report/updatestatus`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        },
        body: JSON.stringify(params.data),
    })
}

const PengaduanPIC = async(params) => {
    let url = `${SERVER_BASE_URL}/report?no_pengaduan=${params.id}`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        }
    })
}

const UpdatePIC = async(params) => {
    let url = `${SERVER_BASE_URL}/report/updatepic`
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token' : params.token
        },
        body: JSON.stringify(params.data),
    })
}

const Pengaduan = {
    GetAllPengaduan,
    GetPengaduan,
    UpdatePengaduan,
    PengaduanPIC,
    UpdatePIC
}


const PostBerita = async(params) => {
    let url = `${SERVER_BASE_URL}/news`
    return await fetch(url, {
        body: params.data,
            method: "post",
            headers: {
                'token': params.token
            }
    })
}

const GetAllBerita = async(params) => {
    let url = `${SERVER_BASE_URL}/news/all`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': params.token
        }
    })
}

const GetBerita = async(params) => {
    let url = `${SERVER_BASE_URL}/news?berita_id=${params.id}`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'token': params.token
        }
    })
}

const Berita = {
    PostBerita,
    GetAllBerita,
    GetBerita
}

const SinergiAPi = {
    User,
    Penyuluhan,
    Pengaduan,
    Berita
}

export default SinergiAPi