import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";

const SecurePayement = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title={'Paiement Sécurisé'}>
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Paiement Sécurisé</h1>
                    <p className="text-gray-700 mb-4">CHEZ TEDMOTOSPIECES : ACHETEZ EN TOUTE CONFIANCE. Nous vous
                        proposons plusieurs moyens de paiement :</p>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Chèque</li>
                        <li>Carte Bancaire</li>
                        <li>3xCB par Stripe</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Paiement par chèque</h3>
                    <p className="text-gray-700 mb-4">Payer votre commande par chèque : Le chèque du règlement complet
                        de la commande est à envoyer sous 7 jours maximum. Passé ce délai votre commande sera
                        définitivement annulée. Le règlement est à effectuer à l’ordre de « MARIE TEDDY » et à envoyer à
                        l’adresse suivante :</p>
                    <p className="text-gray-700 mb-4">
                        Tedmotospieces<br/>
                        MARIE Teddy<br/>
                        8b chemin de la croix Nicolas<br/>
                        14190 Maizières
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Paiement sécurisé par carte bancaire</h3>
                    <p className="text-gray-700 mb-4">Le règlement par carte bancaire utilise la solution sécurisée de
                        paiement STRIPE. La transmission de vos informations personnelles et de vos données bancaires
                        est entièrement sécurisée. Les informations bancaires sont encryptées grâce à un certificat SSL
                        au niveau de la page de paiement (page en https).</p>
                    <p className="text-gray-700 mb-4">Ce cryptage des informations bancaires nous permet de vous assurer
                        un niveau de sécurité élevé pour vos transactions. Les données de paiement ne sont donc pas
                        stockées en clair sur Internet.</p>
                    <p className="text-gray-700 mb-4">De plus, la saisie de vos numéros de carte bancaire est reçue et
                        gérée uniquement sur le serveur Stripe. Vos données bancaires sont donc uniquement accessibles
                        par Stripe, afin qu'elle puisse se mettre en relation avec votre banque.</p>
                    <p className="text-gray-700 mb-4">À aucun moment vos coordonnées bancaires ne sont communiquées à la
                        société Tedmotospieces, ou tout autre tiers, et elles ne transitent pas par le serveur
                        Tedmotospieces.</p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Paiement sécurisé 3xCB Stripe</h3>
                    <p className="text-gray-700 mb-4">En choisissant le paiement sécurisé en plusieurs fois 3xCB Stripe,
                        vous optez pour un paiement en 3 fois sans frais, simple, rapide et direct. Le paiement en
                        plusieurs mensualités via le 3xCB est disponible pour les commandes d’un montant allant de 100 à
                        1500 € euros TTC frais d’expédition inclus.</p>
                </section>
            </div>
        </ApplicationLayout>
    );
};

export default SecurePayement;
