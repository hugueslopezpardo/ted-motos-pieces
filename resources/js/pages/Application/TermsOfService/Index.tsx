import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout"; // Updated import statement

const TermsOfServicePage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title="Conditions Générales d'Utilisation">
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Conditions Générales d'Utilisation</h1>
                    <p className="text-gray-700 mb-4">Bienvenue sur le site e-commerce de Ted Motos Pièces. En accédant à notre site, vous acceptez les présentes conditions générales d'utilisation.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Objet</h2>
                    <p className="text-gray-700 mb-4">Les présentes conditions régissent l'utilisation du site, l'achat de nos produits, ainsi que l'accès aux services proposés par Ted Motos Pièces.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">2. Inscription et Compte Utilisateur</h2>
                    <p className="text-gray-700 mb-4">Pour passer commande, il est nécessaire de créer un compte. Vous êtes responsable de la sécurité de votre compte et des informations fournies lors de l'inscription.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Propriété Intellectuelle</h2>
                    <p className="text-gray-700 mb-4">Tout contenu présent sur notre site (texte, images, logos, etc.) est la propriété exclusive de Ted Motos Pièces. Toute reproduction est interdite sans autorisation écrite préalable.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Limitation de Responsabilité</h2>
                    <p className="text-gray-700 mb-4">Ted Motos Pièces ne saurait être tenue responsable en cas de dommages indirects résultant de l'utilisation de notre site ou de l'achat de nos produits, dans les limites prévues par la loi.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">5. Modification des Conditions</h2>
                    <p className="text-gray-700 mb-4">Ted Motos Pièces se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés par notification sur le site.</p>
                </section>
            </div>
        </ApplicationLayout>
    );
};

export default TermsOfServicePage;
