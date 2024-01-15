"use client";
import Head from "next/head";
import Image from "next/image";

import { useContext, useState } from "react";
import Error from "next/error";
import { publicFetcher } from "@/hooks/usePublicRoute";
import TokenContext from "../../contexts/TokenContext";
import { useRouter } from 'next/navigation';
import API from "@/constants/apiEndpoint";
import { Toast } from "flowbite-react";
import CustomToast from "@/components/Toast";


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    
    const { setToken } = useContext(TokenContext);
    const router = useRouter();
    const [status, setStatus] = useState(false);

    const handleLogin = async () => {
        if (!validateEmail(email) && !validatePassword(password)) {
            setEmailError(true);
            setEmail('');
            setPasswordError(true);
            setPassword('');
            return;
        }
        else if (!validateEmail(email)) {
            setPasswordError(false);
            setPassword('');
            setEmailError(true);
            setEmail('');
            return;
        }
        else if (!validatePassword(password)) {
            setEmailError(false);
            setPasswordError(true);
            setPassword('');
            return;
        }
        else {
            setEmailError(false);
            setPasswordError(false);

            const res = await publicFetcher(API.authentication.signIn, "POST", {
                email,
                password,
            });

            if (res.status == 200) {
                const token = await res.json();
                setToken({
                    accessToken: token.tokens.access.token,
                    refreshToken: token.tokens.refresh.token,
                })
                localStorage.setItem("token", token.tokens.access.token);
                localStorage.setItem("refresh", token.tokens.refresh.token);
                setStatus(true);
                setErr('Login Successful');
                router.push("/sales");
            } else {
                setEmail('');
                setPassword('');
                setErr('Email or password is invalid');
                setStatus(true);
            }

        return;
    }
}

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div
            className=" flex flex-row w-4/5 h-screen place-items-centern items-center mx-auto"
        >
            <Image
                priority
                className=" mx-28"
                src="/images/bg1.png"
                height={600}
                width={600}
                alt=""
                />
            <div
                className=" w-full"
            >
                <p 
                    className=" flex justify-around text-text text-4xl font-[600] my-6"
                >QTK STORE</p>
                <p
                    className=" flex text-sm text-text font-[400] justify-around text-center mb-10"
                >Streamline your store, maximize convenience.<br/>Elevate management effortlessly.</p>
                <h2 className=" text-secondary text-[24px] font-[600] leading-[32px] mb-3">Login</h2>
                <form>
                    <label htmlFor="username" 
                        className=" text-secondary text-sm"
                    >Email: </label><br/>
                        <input 
                            className="w-[297px] h-[40px] rounded-[4px] border-solid border-[1px] border-primary outline-secondary mb-3"
                            name="email" type="text" placeholder="Example@example.com" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                        />
                        
                        {emailError && <p className=" text-red-600 text-xs">*Invalid email address</p>}
                        <br/>
                    <label htmlFor="password" 
                        className=" text-secondary text-sm"
                    >Password: </label><br/>
                        <input 
                            className="w-[297px] h-[40px] rounded-[4px] border-solid border-[1px] border-primary outline-secondary mb-3"
                            name="password" type="password" placeholder="password" 
                            value={password}
                            required
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {passwordError && <p className=" text-red-600 text-xs">*Invalid password. Password must be at least 8 characters long and contain only letters and numbers.</p>}
                        <br/>
                        {/* <input type="checkbox" id="rememberSignIn" name="rememberSignIn"/> */}
                        {/* <label htmlFor="rememberSignIn"
                            className=" text-text font-400"
                        > Ghi nho</label><br/> */}
                        <button 
                            className=" text-white bg-primary w-36 h-10 rounded text-[15px] border border-primary font-[500] hover:text-primary hover:bg-white mt-3"
                            name="signIn" id="signIn" type="button"onClick={handleLogin}
                        >Sign In</button>
                </form>
                {status? (<CustomToast status={false} title={err} />) : (<></>)}
            </div>
        </div>
    );  
}