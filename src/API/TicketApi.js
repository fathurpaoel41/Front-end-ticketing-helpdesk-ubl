import axios from "axios"
import baseurl from "./baseurl"

class TicketApi extends baseurl {
    subPath = "api/ticket"

    readTicketClient(page, body) {
        return axios.post(this.BASE_URL + this.subPath + `/read-ticket-client?page=${page}`, body, this.authHeaders())
    }

    filterTicket(body, page) {
        // const idUser = {
        //     id_user: parseInt(localStorage.getItem("id_user"))
        // }
        // const finalBody = Object.assign(body, idUser)
        return axios.post(this.BASE_URL + this.subPath + `/search-ticket?page=${page}`, body, this.authHeaders())
    }

    inputTicketClient(body) {
        const idUser = {
            id_user: parseInt(localStorage.getItem("id_user"))
        }
        const finalBody = Object.assign(body, idUser)
        return axios.post(this.BASE_URL + this.subPath + `/input-ticket`, finalBody, this.authHeaders())
    }

    readTicketByIdTicket(idTicket) {
        return axios.get(this.BASE_URL + this.subPath + `/read-ticket/${idTicket}`, this.authHeaders())
    }

    getTicketInProgress() {
        return axios.get(this.BASE_URL + this.subPath + "/get-ticket-in-progress", this.authHeaders())
    }

    getTicketIT(page) {
        return axios.post(this.BASE_URL + this.subPath + `/read-ticket-it?page=${page}`, this.authHeaders())
    }

    approvalTicket(body) {
        return axios.post(this.BASE_URL + this.subPath + "/approval-ticket", body, this.authHeaders())
    }

    doneTicket(body) {
        return axios.post(this.BASE_URL + this.subPath + "/done-ticket", body, this.authHeaders())
    }
}

export default TicketApi