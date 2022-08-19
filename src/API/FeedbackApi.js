import axios from "axios"
import baseurl from "./baseurl"

class FeedbackApi extends baseurl {
    subPath = "api/feedback"

    addFeedback(body) {
        return axios.post(this.BASE_URL + this.subPath + "/add-feedback", body, this.authHeaders())
    }

}

export default FeedbackApi