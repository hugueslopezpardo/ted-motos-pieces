import { FormEventHandler } from 'react';
import ApplicationLayout from "@/layouts/ApplicationLayout";
import { Head, useForm } from '@inertiajs/react';
import {User} from "@/types";

export default function ConfirmPassword({ auth } : { auth: { user: User } }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <ApplicationLayout auth={auth} title={'Confirmer le mot de passe'}>
            <div className="isolate mb-24">

                <div className="bg-white px-6 py-12 sm:py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Confirmer le mot de passe
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Pour des raisons de sécurité, veuillez confirmer votre mot de passe pour continuer.
                        </p>
                    </div>
                </div>

                <form className="mx-auto mt-4 max-w-xl sm:mt-4" onSubmit={submit}>

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
                    </div>
                </form>
            </div>
        </ApplicationLayout>
    );
}
