import {FormEventHandler} from 'react';
import {Link, useForm} from '@inertiajs/react';
import {PageProps} from "@/types";
import ApplicationLayout from "@/layouts/ApplicationLayout";

export default function LoginPage({auth, status, canResetPassword}: PageProps<{
    status?: string,
    canResetPassword: boolean
}>) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <ApplicationLayout auth={auth} title={'Connexion'}>
            <div className="isolate mb-24">
                <div className="bg-white px-6 py-12 sm:py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Connexion
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Connectez-vous à votre compte pour accéder à votre espace personnel.
                        </p>
                    </div>
                </div>

                <form className="mx-auto mt-4 max-w-xl sm:mt-4" onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="email"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Votre adresse email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        </div>
                        <div className="sm:col-span-2">
                            <div className={'flex justify-between items-center'}>
                                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Mot de passe
                                </label>

                                <Link href={route('password.request')}
                                      className="text-sm font-semibold text-gray-900 hover:text-red-500">
                                    Mot de passe oublié ?
                                </Link>

                            </div>

                            <div className="relative mt-2.5">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            {processing ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </div>
                </form>
            </div>
        </ApplicationLayout>
    )

}
