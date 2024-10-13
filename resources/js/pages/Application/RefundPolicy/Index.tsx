import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout"; // Updated import statement

const RefundPolicyPage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title={'Politique de Remboursement'}>
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Politique de Remboursement</h1>
                    <p className="text-gray-700 mb-4">Chez Ted Motos Pièces, nous mettons tout en œuvre pour que nos clients soient satisfaits. Si toutefois vous n'êtes pas satisfait de votre achat, vous pouvez consulter notre politique de remboursement ci-dessous.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Droit de Rétractation</h2>
                    <p className="text-gray-700 mb-4">Vous avez le droit de vous rétracter de votre commande dans un délai de 14 jours après réception de votre commande, sans avoir à justifier de motif.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">2. Processus de Remboursement</h2>
                    <p className="text-gray-700 mb-4">Pour exercer votre droit de rétractation, contactez notre service client à <a href="mailto:contact@tedmotospieces.fr" className="text-blue-600 hover:underline">contact@tedmotospieces.fr</a>. Les produits doivent être retournés dans leur état d'origine, non utilisés et dans leur emballage d'origine.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Frais de Retour</h2>
                    <p className="text-gray-700 mb-4">Les frais de retour sont à votre charge, sauf en cas de produit défectueux ou d'erreur de notre part. Dans ce cas, nous prendrons en charge les frais de retour.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Délais de Remboursement</h2>
                    <p className="text-gray-700 mb-4">Le remboursement sera effectué sous 14 jours après réception et vérification du produit retourné. Le remboursement sera effectué via le même mode de paiement que celui utilisé lors de la commande.</p>
                </section>
            </div>
        </ApplicationLayout>
    );
};

export default RefundPolicyPage;
