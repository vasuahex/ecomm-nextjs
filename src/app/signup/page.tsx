"use client"
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storingAllUsers } from '@/redux/features/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

// Define the interface for your form data
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    // Define a Yup schema for form validation
    const validationSchema = yup.object().shape({
        firstName: yup.string().min(2).required('First Name is required'),
        lastName: yup.string().min(2).required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    });

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({}); // To store validation errors

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage' && files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0], // Dynamically update the property based on the 'name'
            });
        } else {
            setFormData({
                ...formData,
                [name]: value, // Dynamically update the property based on the 'name'
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate the form data against the schema
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                // Form data is valid
                dispatch(storingAllUsers(formData));
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                router.push("/login");
            })
            .catch((err: yup.ValidationError) => {
                // Form data is invalid; set the validation errors
                const validationErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path!] = error.message;
                });
                setErrors(validationErrors);
            });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userIsAuthenticated = localStorage.getItem("currentUser") !== null;
            if (userIsAuthenticated) {
                router.push('/');
            }
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-14">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-600 mb-2">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-600 mb-2">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-center text-white rounded py-2 px-4 hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
