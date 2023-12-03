import Head from "next/head";
import Image from "next/image";


export default function SignIn() {
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
                    >Username: </label><br/>
                        <input 
                            className="w-[297px] h-[40px] rounded-[4px] border-solid border-[1px] border-primary outline-secondary mb-3"
                            name="username" type="text" placeholder="username" 
                        />
                        <br/>
                    <label htmlFor="password" 
                        className=" text-secondary text-sm"
                    >Password: </label><br/>
                        <input 
                            className="w-[297px] h-[40px] rounded-[4px] border-solid border-[1px] border-primary outline-secondary mb-3"
                            name="password" type="password" placeholder="password   " 
                        />
                        <br/>
                        <input type="checkbox" id="rememberSignIn" name="rememberSignIn"/>
                        <label htmlFor="rememberSignIn"
                            className=" text-text font-400"
                        > Ghi nho</label><br/>
                        <button 
                            className=" text-white bg-primary w-36 h-10 rounded text-[15px] border border-primary font-[500] hover:text-primary hover:bg-white mt-3"
                            name="signIn" id="signIn" type="button"
                        >Sign In</button>
                </form>
            </div>
        </div>
    );  
}