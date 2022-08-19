import React, { useEffect } from 'react'
import baseurl from "../../API/baseurl"

export default function wrapAuth() {

    useEffect(() => {
        checkSession()
    }, [])

    const checkSession = () => {
        const baseUrl = new baseurl()
        baseUrl.checkSession().then((res) => {
            console.log(res)
        })
    }
    return (
        <>
            {children}
        </>
    )
}
