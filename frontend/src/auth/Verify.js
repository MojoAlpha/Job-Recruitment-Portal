import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { authenticate } from '.';
import { basicAxios } from '../components/api';

const Verify = ({ history }) => {

    const {type, token} = useParams();

    useEffect(() => {
        basicAxios.put(`/auth/verify/${type}/${token}`)
            .then(res => {
                if(res.data.success){
                    alert("Success.")
                    const data = {type:type,token: res.data.token};
                    if (typeof window !== "undefined") {
                        localStorage.setItem("jwt", JSON.stringify(data));
                      }
                      history.push("/");
                } else{
                    alert("Wrong Verification link. Retry")
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    return (
        <div>
            Verification
        </div>
    )
}

export default Verify;