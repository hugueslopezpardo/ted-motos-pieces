import ApplicationLayout from "@/layouts/ApplicationLayout";
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {User} from "@/types";

export default function ForgotPassword({ auth, status }: { auth: { user: User }, status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <ApplicationLayout auth={auth} title={'Mot de passe oublié'}>
            <div className="isolate mb-24">

                <div className="bg-white px-6 py-12 sm:py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Mot de passe oublié
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
                        </p>
                    </div>
                </div>

                <form className="mx-auto mt-4 max-w-xl sm:mt-4" onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Adresse e-mail
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={'Votre adresse e-mail'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="inline-block w-full px-4 py-2 text-sm font-semibold leading-6 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:shadow-outline-red focus:border-red-700"
                            disabled={processing}
                        >
                            Réinitialiser le mot de passe
                        </button>
                    </div>
                </form>
            </div>
        </ApplicationLayout>
    );
}
