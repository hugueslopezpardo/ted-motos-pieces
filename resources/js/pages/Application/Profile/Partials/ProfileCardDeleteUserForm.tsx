import { useRef, useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';

export default function ProfileCardDeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Supprimer votre compte
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Supprimer votre compte supprimera toutes vos ressources et données de manière permanente.
                </p>
            </header>

            <form onSubmit={deleteUser} className="space-y-6">
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                </div>

                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="block rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Supprimer votre compte
                    </button>
                </div>
            </form>
        </section>
    );
}
