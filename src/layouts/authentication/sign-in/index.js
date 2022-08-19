import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";

import baseurl from "../../../API/baseurl"
import AuthApi from "../../../API/AuthApi"
import { useNavigate } from "react-router-dom"

import { Button } from "react-bootstrap"

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [messageValidateEmail, setMessageValidateEmail] = useState([]);
  const [messageValidatePassword, setMessageValidatePassword] = useState([]);
  const [count, setCount] = useState(0)

  let navigate = useNavigate()

  useEffect(() => {
    checkSession()
    console.log({ touchedEmail, touchedPassword, messageValidateEmail, messageValidatePassword })

    //validation form
    if (email.length === 0 || password.length === 0) {
      //kalau email dan password kosong
      setButtonDisable(true)
    } else {
      //email dan password ada isi
      const whiteSpace = /\s/gm
      const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm
      if (email.match(whiteSpace)?.length > 0) {
        // email ada spasi
        setButtonDisable(true)
      } else if (mail.test(email)) {
        //check ada @nya
        setButtonDisable(false)
      } else {
        //klo gk ada @nya maka true
        setButtonDisable(true)
      }
    }

    const whiteSpace = /\s/gm
    const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm

    //validasi email
    if (touchedEmail) {
      if (email.length === 0) {
        const found = messageValidateEmail.find(element => element === "Email tidak boleh kosong");
        if (found == undefined) {
          messageValidateEmail.push("Email tidak boleh kosong")
        }
      } else if (email.length > 0) {
        // arrayRemove(messageValidateEmail, "Email tidak boleh kosong")
        let myIndex = messageValidateEmail.indexOf("Email tidak boleh kosong");
        if (myIndex !== -1) {
          messageValidateEmail.splice(myIndex, 1);
        }
      }

      if ((email.match(whiteSpace)?.length > 0 || mail.test(email) === false) && email.length > 0) {
        const found = messageValidateEmail.find(element => element === "Format Email Tidak Sesuai");
        if (found == undefined) {
          messageValidateEmail.push("Format Email Tidak Sesuai")
        }
      } else {
        // arrayRemove(messageValidateEmail, "Format Email Tidak Sesuai")
        let myIndex = messageValidateEmail.indexOf("Format Email Tidak Sesuai");
        if (myIndex !== -1) {
          messageValidateEmail.splice(myIndex, 1);
        }
      }
    }

    //validasi password
    if (touchedPassword) {
      if (password.length === 0) {
        const found = messageValidatePassword.find(element => element === "Password tidak boleh kosong");
        if (found == undefined) {
          messageValidatePassword.push("Password tidak boleh kosong")
        }
      } else if (password.length > 0) {
        messageValidatePassword.shift()
      }
    }
    return () => {
      setCount(count + 1)
    }
  }, [email, password, touchedEmail, touchedPassword, messageValidatePassword, messageValidateEmail, count]);

  const handleBlurEmail = useCallback(() => {
    setTouchedEmail(true)
    console.log({ messageValidateEmail })
    setCount(count + 1)
  }, [touchedEmail, count]);

  const handleBlurPassword = useCallback(() => {
    setTouchedPassword(true)
    console.log({ messageValidatePassword })
    setCount(count + 1)
  }, [touchedPassword, count]);


  const handleChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
    setCount(count + 1)
  }, [email, count]);


  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value)
    setCount(count + 1)
  }, [password, count]);

  const checkSession = () => {
    let token = localStorage.getItem("token")
    if (token != null) {
      const baseUrl = new baseurl()
      baseUrl.checkSession().then((res) => {
        if (res.data.status === true) {
          // window.location.href = window.location.origin + "/dashboard";
          navigate("/dashboard", { replace: true });
        }
      })
    }
  }

  // const messageValidation = useCallback(() => {

  // }, [touchedEmail, touchedPassword, messageValidatePassword, messageValidateEmail]);

  // const arrayRemove = useCallback((arr, value) => {
  //   let myIndex = arr.indexOf(value);
  //   if (myIndex !== -1) {
  //     arr.splice(myIndex, 1);
  //   }
  // }, [messageValidateEmail, messageValidatePassword, touchedEmail, touchedPassword]);

  function handleLogin() {
    const authApi = new AuthApi();
    const data = {
      "email": email,
      "password": password
    }

    authApi.login(data).then((res) => {
      // console.log(res)
      if (res.data.status === true) {
        localStorage.setItem("token", res.data.access_token)
        localStorage.setItem("id_user", res.data.user.id)
        authApi.me().then((r) => {
          localStorage.setItem("role", r.data.data[0].nama_divisi)
          if (data.email === r.data.data[0].email) {
            console.log(true)
            navigate("/dashboard", { replace: true });
          }
          // window.location.href = window.location.origin + "/dashboard";
          setErrorLogin(false)
        })
      } else {
        setErrorLogin(true)
      }
    })
  }



  return (
    <CoverLayout
      title="Welcome To Ticketing Helpdesk"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            {errorLogin ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
              <span style={{ color: '#d9534f' }}>Email dan Password Salah</span>
            </SuiTypography>) : ""}
            <br />
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <input type="text" name="email" placeholder="Enter email" className="form-control" onChange={handleChangeEmail} onBlur={handleBlurEmail} />
        </SuiBox>
        {touchedEmail &&
          messageValidateEmail.map((res, idx) => {
            return <SuiTypography key={idx} component="label" variant="caption" fontWeight="bold">
              <span style={{ color: '#d9534f' }}>{res}</span>
            </SuiTypography>
          })
        }
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <input type="password" name="password" placeholder="Enter password" className="form-control" onBlur={handleBlurPassword} onChange={handleChangePassword} />
        </SuiBox>
        {touchedPassword &&
          messageValidatePassword.map((res, idx) => {
            return <SuiTypography key={idx} component="label" variant="caption" fontWeight="bold">
              <span style={{ color: '#d9534f' }}>{res}</span>
            </SuiTypography>
          })
        }

        <SuiBox mt={4} mb={1}>
          <Button variant="primary" onClick={handleLogin} disabled={buttonDisable}>Sign In</Button>
        </SuiBox>
        {/* <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox> */}
      </SuiBox>
    </CoverLayout >
  )
}

export default SignIn;
