import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {useToast} from "@/hooks/use-toast";

export default function ProfileCardUpdateInformationForm({ mustVerifyEmail, status, regions, departments, className = '' } : { mustVerifyEmail: boolean, status?: string, regions: any, departments: any, className?: string }) {
    const user = usePage().props.auth.user;
    {/* @ts-ignore */}
    const details = usePage().props.auth.details;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_number: details.phone_number,
        location_region_id: details.location_region_id,
        location_department_id: details.location_department_id,
        postal_code: details.postal_code,
        address: details.address,
        city: details.city,
    });

    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                toast({
                    title: 'Informations mises à jour',
                    description: 'Vos informations personnelles ont été mises à jour avec succès.',
                })
            },
            onError: (errors) => {
                console.log(errors);
                toast({
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la mise à jour de vos informations personnelles. Veuillez réessayer.',
                    variant: 'destructive',
                })
            }
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Mettre à jour vos informations personnelles
                </h2>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                        Nom
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                        Adresse email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900">
                        Numéro de téléphone
                    </label>
                    <input
                        type="text"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}

                    />
                    <p className="mt-2 text-sm text-red-600">{errors.phone_number}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">
                            Région
                        </label>
                        <select
                            className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            value={data.location_region_id}
                            onChange={(e) => setData('location_region_id', e.target.value)}
                        >
                            <option value="">Sélectionnez une région</option>
                            {regions.map((region: any) => (
                                <option key={region.id} value={region.id}>{region.name}</option>
                            ))}
                        </select>
                        <p className="mt-2 text-sm text-red-600">{errors.location_region_id}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900">
                            Département
                        </label>
                        <select
                            className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            value={data.location_department_id}
                            onChange={(e) => setData('location_department_id', e.target.value)}
                        >
                            <option value="">Sélectionnez un département</option>
                            {departments.map((department: any) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                        <p className="mt-2 text-sm text-red-600">{errors.location_department_id}</p>
                    </div>

                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">
                            Ville
                        </label>
                        <input
                            type="text"
                            className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                        />
                        <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">
                            Code postal
                        </label>
                        <input
                            type="text"
                            className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                        />
                        <p className="mt-2 text-sm text-red-600">{errors.postal_code}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">
                            Adresse
                        </label>
                        <input
                            type="text"
                            className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                    </div>
                </div>

                    <div>
                        <button
                            type="submit"
                            className="block rounded-md bg-white text-red-600 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm border border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition duration-150 ease-in-out"
                        >
                            Mettre à jour
                        </button>
                    </div>
            </form>
        </section>
);
}
