import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";

const RefundPolicyPage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title={'Politique de livraison'}>
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Politique de livraison</h1>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Livraison</h2>
                    <p className="text-gray-700 mb-4">Les expéditions se font du lundi au samedi. Il n’y a pas
                        d’expédition les jours fériés.</p>
                    <p className="text-gray-700 mb-4">Si votre commande est passée avant 14h, elle sera expédiée le
                        jour-même sauf en cas de surcharge temporaire.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Mode de livraison</h2>
                    <p className="text-gray-700 mb-4">Livraison en point relais : Mondial relay.</p>
                    <p className="text-gray-700 mb-4">Livraison à domicile : Lettre suivie La Poste ou Colissimo
                        Domicile sans signature.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Délais de livraison</h2>
                    <p className="text-gray-700 mb-4">Les délais de livraison varient en fonction du mode de livraison
                        choisie. Les commandes partent de notre établissement 24-48h. Le délai transporteur est de
                        24-48h (moyenne constatée) mais peut varier en fonction de situations exceptionnelles.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Destination</h2>
                    <p className="text-gray-700 mb-4">France Métropolitaine. Les commandes sont livrées à l’adresse de
                        livraison renseignée lors de la validation de commande. En cas d’erreur de votre part sur
                        l’adresse de livraison, Ted Motos Pièces ne saurait être tenu pour responsable.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Frais d’expédition</h2>
                    <p className="text-gray-700 mb-4">Les frais d’expédition sont calculés en fonction du mode de
                        livraison choisi et de la destination de la commande pour la France. Les frais d’expédition
                        prennent en compte le traitement de la commande, l’emballage et les frais d’expédition.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Retour</h2>
                    <p className="text-gray-700 mb-4">Pour effectuer un retour complet ou partiel de votre commande,
                        veuillez nous contacter par mail à tedmotospieces@gmail.com.</p>
                </section>
            </div>
        </ApplicationLayout>
    );
};

export default RefundPolicyPage;
