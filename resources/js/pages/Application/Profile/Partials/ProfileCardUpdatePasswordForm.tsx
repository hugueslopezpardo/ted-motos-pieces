import { useRef, useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import {useToast} from "@/hooks/use-toast";

export default function ProfileCardUpdatePasswordForm({ className = '' }: { className?: string }) {
    const [confirmingPasswordUpdate, setConfirmingPasswordUpdate] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        put,
        processing,
        reset,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const { toast } = useToast();


    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Mot de passe mis à jour',
                    description: 'Votre mot de passe a été mis à jour avec succès.',
                })
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }

                toast({
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la mise à jour de votre mot de passe. Veuillez réessayer.',
                    variant: 'destructive',
                })

            },
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Mettre à jour votre mot de passe
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Assurez-vous d'utiliser un mot de passe long et aléatoire pour sécuriser votre compte.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-semibold text-gray-900">
                        Mot de passe actuel
                    </label>
                    <input
                        id="current_password"
                        type="password"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        ref={currentPasswordInput}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.current_password}</p>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                        Nouveau mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        ref={passwordInput}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-900">
                        Confirmer le nouveau mot de passe
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                </div>

                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="block rounded-md bg-white text-red-600 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm border border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition duration-150 ease-in-out"
                    >
                        Mettre à jour le mot de passe
                    </button>
                </div>

            </form>

        </section>
    );
}
