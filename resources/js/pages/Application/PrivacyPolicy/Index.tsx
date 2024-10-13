import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout"; // Updated import statement

const PrivacyPolicyPage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title="Politique de Confidentialité">
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Politique de Confidentialité</h1>
                    <p className="text-gray-700 mb-4">Chez Ted Motos Pièces, la protection de vos données est notre priorité.
                        Cette politique explique comment nous collectons, utilisons et protégeons vos informations
                        personnelles.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Collecte des Données</h2>
                    <p className="text-gray-700 mb-4">Nous collectons des données personnelles lors de la création de votre
                        compte, du traitement de vos commandes et de vos interactions avec notre service client.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">2. Utilisation des Données</h2>
                    <p className="text-gray-700 mb-4">Les informations collectées sont utilisées pour traiter vos commandes,
                        personnaliser votre expérience et améliorer nos services. Elles peuvent également être utilisées à des
                        fins marketing, sous réserve de votre consentement.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Protection des Données</h2>
                    <p className="text-gray-700 mb-4">Nous mettons en œuvre des mesures de sécurité techniques et
                        organisationnelles pour protéger vos données contre toute perte, accès non autorisé ou divulgation.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Partage des Données</h2>
                    <p className="text-gray-700 mb-4">Nous ne partageons vos données qu'avec des prestataires de services
                        nécessaires à l'exécution des commandes (transporteurs, fournisseurs de paiement). Vos données ne sont
                        jamais vendues à des tiers.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">5. Vos Droits</h2>
                    <p className="text-gray-700 mb-4">Conformément à la loi "Informatique et Libertés", vous avez un droit
                        d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits,
                        contactez-nous à <a href="mailto:contact@tedmotospieces.fr"
                                            className="text-blue-600 hover:underline">contact@tedmotospieces.fr</a>.</p>
                </section>
            </div>
        </ApplicationLayout>

    );
};

export default PrivacyPolicyPage;
