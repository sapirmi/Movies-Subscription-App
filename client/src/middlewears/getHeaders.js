import cookie from "js-cookie"

function getHeaders(){
    return {headers: { Authorization: `Bearer ${cookie.get("token")}` } }
}

export default getHeaders