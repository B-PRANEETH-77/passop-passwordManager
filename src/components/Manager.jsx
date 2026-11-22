


import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])



    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        // console.log(passwords)
        setpasswordArray(passwords)

        // let passwords = localStorage.getItem('passwords')
        // let passwordArray;
        // if (passwords) {
        //     setpasswordArray(JSON.parse(passwords))

        // }
    }

    useEffect(() => {
        getpasswords();
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("eyecross.png")) {

            ref.current.src = "eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "eyecross.png"
            passwordRef.current.type = "text"
        }
    }


    // const savePassword = async () => {
    //     if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

    //         // if any such id exist in the db , then delete it...
    //         if (form.id) {

    //             await fetch("http://localhost:3000/", {
    //                 method: "DELETE", headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ id: form.id })
    //             })
    //         }


    //         setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    //         await fetch("http://localhost:3000/", {
    //             method: "POST", headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ ...form, id: uuidv4() })
    //         })
    //         // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    //         // console.log([...passwordArray, form])
    //         setform({ site: "", username: "", password: "" })
    //         toast('Password Saved !', {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //     }
    //     else {
    //         toast('Error ! Password Not Saved !', {
    //             autoClose: 2000
    //         })

    //     }

    // }


    const savePassword = async () => {
    if (
        form.site.length > 3 &&
        form.username.length > 3 &&
        form.password.length > 3
    ) {
        try {
            // Keep the existing ID when editing; generate one when adding
            const passwordData = {
                ...form,
                id: form.id || uuidv4()
            };

            // If editing, delete the old database record first
            if (form.id) {
                const deleteResponse = await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: form.id })
                });

                if (!deleteResponse.ok) {
                    throw new Error("Failed to update existing password");
                }
            }

            // Save the password to MongoDB
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(passwordData)
            });

            if (!response.ok) {
                throw new Error("Failed to save password");
            }

            // Update React state using the same ID
            setpasswordArray(prev => [
                ...prev.filter(item => item.id !== passwordData.id),
                passwordData
            ]);

            // Clear the form
            setform({
                site: "",
                username: "",
                password: ""
            });

            toast.success("Password Saved!", {
                autoClose: 2000
            });

        } catch (error) {
            console.error("Error saving password:", error);
            toast.error("Password could not be saved!", {
                autoClose: 2000
            });
        }
    } else {
        toast.error("Please enter valid details!", {
            autoClose: 2000
        });
    }
};

    const deletePassword = async (id) => {
        let c = confirm("You want to Delete..?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })


            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('Password Deleted !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        // console.log([...passwordArray, form])
    }


    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="fixed inset-0 -z-10  w-full bg-purple-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[450px] w-[450px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 min-h-[81.9vh]   md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-blue-700'>&lt;</span>
                    Pass
                    <span className="text-blue-700">OP /&gt;</span>
                </h1>
                <p className='text-blue-900 text-lg text-center'>Your Own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' type="text" name='site' id='site' className='rounded-full border border-blue-500 p-4 py-1 w-full' />
                    <div className="flex-col md:flex-row flex justify-between w-full gap-8">
                        <input value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' type="text" id='username' className='rounded-full border border-blue-500 w-full p-4 py-1' />

                        <div className="relative">

                            <input value={form.password} name='password' onChange={handleChange} placeholder='Enter Password' ref={passwordRef} id='password' type="password" className='rounded-full border border-blue-500 p-4 w-full py-1' />

                            <span className="absolute top-1 right-2 cursor-pointer " >
                                <img ref={ref} src="eye.png" alt="eye" width={26} className='p-1' onClick={showPassword} />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 rounded-full
                     px-4 py-1 w-fit border border-blue-950'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Add Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>My passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-5">
                            <thead className='bg-slate-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-purple-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center  py-2 border border-white '>
                                            <div className="flex items-center justify-center">
                                                <a href={item.site} target='_blank'><span> {item.site}</span></a>
                                                <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon style={{ width: "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className="flex items-center justify-center">
                                                <span> {item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon style={{ width: "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center  py-2 border border-white'>
                                            <div className="flex items-center justify-center">
                                                <span> {item.password}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon style={{ width: "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                            <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>

        </>
    )
}


export default Manager



