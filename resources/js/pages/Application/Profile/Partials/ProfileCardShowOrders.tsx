import { useRef, useState, FormEventHandler } from 'react';
import {Link} from "@inertiajs/react";

export default function ProfileCardShowOrders({ className = '' }: { className?: string }) {


    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Mes commandes
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Retrouvez l'historique de vos commandes.
                </p>
            </header>

            <div className="flex justify-start">
                <Link
                    href={route('profile.orders')}
                    className="block rounded-md bg-white text-red-600 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm border border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition duration-150 ease-in-out"
                >
                    Voir mes commandes
                </Link>
            </div>
        </section>
    );
}
