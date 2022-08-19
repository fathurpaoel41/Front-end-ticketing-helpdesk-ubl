import axios from "axios"

class CoreApi {

    constructor(session = null) {
        this.userSession = session
        this.BASE_URL = "https://ticketing-ubl-api.herokuapp.com/"
        // this.BASE_URL = "http://localhost:8000/"

    }

    authHeaders() {
        let accessToken = localStorage.getItem('token')
        return {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }
    }

    checkSession() {
        return axios.get(this.BASE_URL + "api/auth/me", this.authHeaders())
    }

    async authMe() {
        const body = null
        await this.checkSession().then(res => {
            body = {
                id: res.data.data.id,
                email: res.data.data.email,
                email_verified_at: res.data.data.email_verified_at,
                nama: res.data.data.nama,
                divisi: res.data.data.divisi,
                remember_token: res.data.data.remember_token,
                created_at: res.data.data.created_at,
                updated_at: res.data.data.updated_at
            }
        })
        return body
    }

}

export default CoreApi