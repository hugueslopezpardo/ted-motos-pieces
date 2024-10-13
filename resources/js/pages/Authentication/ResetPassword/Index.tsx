import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {User} from "@/types";
import ApplicationLayout from "@/layouts/ApplicationLayout";

export default function ResetPassword({ auth, token, email }: { auth: { user: User }, token: string, email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <ApplicationLayout auth={auth} title={'Réinitialiser le mot de passe'}>
            <Head title="Réinitialiser le mot de passe" />

            <div className="isolate mb-24">
                <div className="bg-white px-6 py-12 sm:py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Réinitialiser le mot de passe
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Veuillez entrer votre nouveau mot de passe.
                        </p>
                    </div>
                </div>

                <form className="mx-auto mt-4 max-w-xl sm:mt-4" onSubmit={submit}>
                    <input type="hidden" name="token" value={token} />
                    <input type="hidden" name="email" value={email} />

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
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

                        <div className="sm:col-span-2">
                            <label htmlFor="password_confirmation" className="block text-sm font-semibold leading-6 text-gray-900">
                                Confirmer le mot de passe
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder={'Confirmer votre mot de passe'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                        </div>

                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm sm:leading-6"
                                disabled={processing}
                            >
                                Réinitialiser le mot de passe
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </ApplicationLayout>
    );
}
