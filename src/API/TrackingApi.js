import axios from "axios"
import baseurl from "./baseurl"

class TicketApi extends baseurl {
    subPath = "api/tracking"

    readAllTracking(idTicket) {
        return axios.get(this.BASE_URL + this.subPath + `/read-all-tracking/${idTicket}`, this.authHeaders())
    }

    confirmTrackingProgress(body) {
        return axios.post(this.BASE_URL + this.subPath + "/confirm-tracking-progress", body, this.authHeaders())
    }
}

export default TicketApi