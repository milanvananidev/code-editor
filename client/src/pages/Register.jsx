import { useState } from "react"
import { isValidEmail } from "../utils/utils";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) { return alert('Please provide valid email') }

        if (password !== confirmPassword) { return alert('Password and confirm pass are not match') }

        // call api to register user

    }

    return (
        <>
            <>
                <section className="text-gray-600 flex justify-center mt-[10%]">
                    <div className="bg-gray-100 rounded-lg p-8  mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                            Sign Up
                        </h2>
                        <div className="relative mb-4">
                            <label
                                htmlFor="full-name"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="full-name"
                                name="full-name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Choose Password
                            </label>
                            <input
                                type="password"
                                id="email"
                                name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="email"
                                name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>
                        <button onClick={onSubmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Register
                        </button>
                    </div>
                </section>

            </>

        </>
    )
}

export default Register