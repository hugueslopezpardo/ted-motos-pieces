import {FormEventHandler, useState} from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {PageProps, User} from "@/types";
import ApplicationLayout from "@/layouts/ApplicationLayout";

export default function RegisterPage({auth, regions, departments}: PageProps<{ auth: { user: User } }> & { regions: any, departments: any }) {

    const {data, setData, post, processing, errors, reset} = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        location_region_id: regions[0].id,
        location_department_id: departments[0].id,
        postal_code: '',
        address: '',
        city: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset(),
        });
    };

    return (
        <ApplicationLayout auth={auth} title={'Inscription'}>
            <div className="isolate mb-24">

                <div className="bg-white px-6 py-12 sm:py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Inscription
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Créez un compte pour accéder à votre espace personnel.
                        </p>
                    </div>
                </div>

                <form className="mx-auto mt-4 max-w-xl sm:mt-4" onSubmit={submit}>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="first_name"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Prénom
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder={'Votre prénom'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>
                        </div>

                        {/* Last name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="last_name"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Nom
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder={'Votre nom'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={'Votre adresse email'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        </div>

                        {/* Phone number */}
                        <div className="sm:col-span-2">
                            <label htmlFor="phone_number"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Numéro de téléphone
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    placeholder={'Votre numéro de téléphone'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.phone_number}</p>
                        </div>

                        {/* Region */}
                        <div className="sm:col-span-2">
                            <label htmlFor="location_region_id"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Région
                            </label>
                            <div className="mt-2.5">
                                <select
                                    id="location_region_id"
                                    name="location_region_id"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.location_region_id}
                                    onChange={(e) => setData('location_region_id', e.target.value)}
                                >
                                    <option value="">Sélectionnez une région</option>
                                    {regions.map((region: any) => (
                                        <option key={region.id} value={region.id}>{region.name}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.location_region_id}</p>
                        </div>

                        {/* Department */}
                        <div className="sm:col-span-2">
                            <label htmlFor="location_department_id"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Département
                            </label>
                            <div className="mt-2.5">
                                <select
                                    id="location_department_id"
                                    name="location_department_id"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.location_department_id}
                                    onChange={(e) => setData('location_department_id', e.target.value)}
                                >
                                    <option value="">Sélectionnez un département</option>
                                    {departments.map((department: any) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.location_department_id}</p>
                        </div>

                        {/* Postal code */}
                        <div className="sm:col-span-2">
                            <label htmlFor="postal_code"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Code postal
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="postal_code"
                                    name="postal_code"
                                    type="text"
                                    placeholder={'Votre code postal'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.postal_code}</p>
                        </div>

                        {/* Address */}
                        <div className="sm:col-span-2">
                            <label htmlFor="address"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Adresse
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder={'Votre adresse'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                        </div>

                        {/* City */}
                        <div className="sm:col-span-2">
                            <label htmlFor="city"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Ville
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder={'Votre ville'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                        </div>

                        {/* Password */}
                        <div className="sm:col-span-2">
                            <label htmlFor="password"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Mot de passe
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder={'Votre mot de passe'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                        </div>

                        {/* Password confirmation */}
                        <div className="sm:col-span-2">
                            <label htmlFor="password_confirmation"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Confirmation mot de passe
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder={'Confirmez votre mot de passe'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                        </div>

                        <div className="sm:col-span-2">
                            <button type="submit" className="w-full py-2.5 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                                {processing ? 'Inscription en cours...' : 'S\'inscrire'}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </ApplicationLayout>
    );
}
