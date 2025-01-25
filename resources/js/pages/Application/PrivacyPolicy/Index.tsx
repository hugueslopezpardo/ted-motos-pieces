import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout"; // Updated import statement

const PrivacyPolicyPage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title="Politique de Confidentialité">
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Politique de confidentialité</h1>
                    <p className="text-gray-700 mb-4">La présente politique de confidentialité décrit les traitements
                        réalisés par TEDMOTOSPIECES concernant toutes données à caractère personnel se rapportant à une
                        personne physique identifiée ou identifiable.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">1. QUI EST LE RESPONSABLE DU TRAITEMENT DE
                        VOS DONNEES PERSONNELLES ?</h2>
                    <p className="text-gray-700 mb-4">
                        Le responsable du traitement de vos Données Personnelles dans le cadre du Site Internet est la
                        société TEDMOTOSPIECES dont l’ensemble des coordonnées sont indiquées ci-après :
                        <br/>
                        Société : TEDMOTOSPIECES <br/>
                        Numéro SIRET : 98058850300014 <br/>
                        Adresse : 8b chemin de la croix nicolas 14190 MAIZIERES (FRANCE) <br/>
                        Numéro de téléphone : 0672197343 <br/>
                        Adresse e-mail : contact@tedmotospieces.fr <br/>
                        Représentant : Monsieur MARIE Teddy
                    </p>
                    <p className="text-gray-700 mb-4">
                        TEDMOTOSPIECES s’engage à collecter et traiter vos Données Personnelles conformément au
                        Règlement européen n°2016/679 du 27 avril 2016 relatif à la protection des données personnelles
                        (« RGPD ») et à la Loi Informatique et Libertés n°78-17 du 6 janvier 1978 dans sa version
                        actuellement en vigueur. À ce titre, TEDMOTOSPIECES s’engage notamment à :
                        <ul className="list-disc ml-5">
                            <li>respecter les finalités pour lesquelles vos Données Personnelles ont été collectées ;
                            </li>
                            <li>recueillir votre consentement préalable et exprès avant toute utilisation de vos Données
                                Personnelles aux fins mentionnées aux articles 2.4 et 2.5 ci-après ;
                            </li>
                            <li>ne pas transmettre vos Données Personnelles à des tiers sans votre consentement
                                préalable et exprès ;
                            </li>
                            <li>protéger vos Données Personnelles dans des conditions raisonnables de sécurité ;</li>
                            <li>vous informer, par tous moyens et sans retard injustifié, dans le cas où l’intégrité, la
                                confidentialité et/ou la sécurité de vos Données Personnelles seraient compromises.
                            </li>
                        </ul>
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">2. QUELLES DONNEES PERSONNELLES SONT
                        COLLECTEES ET POUR QUELLES FINALITES ?</h2>
                    <p className="text-gray-700 mb-4">
                        Les Données Personnelles suivantes vous concernant sont collectées dans le cadre de votre
                        navigation et/ou de vos achats sur le Site Internet.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">2.1. DONNÉES COLLECTÉES LORS DE LA SAISIE
                        DU FORMULAIRE DE CONTACT</h3>
                    <p className="text-gray-700 mb-4">
                        Lorsque vous renseignez le formulaire pour contacter les équipes de TEDMOTOSPIECES, nous
                        collectons les Données Personnelles et autres informations suivantes :
                        <ul className="list-disc ml-5">
                            <li>votre nom et votre prénom ;</li>
                            <li>votre adresse de courrier électronique ;</li>
                            <li>votre numéro de téléphone (donnée non-obligatoire) ;</li>
                            <li>toutes autres informations communiquées par vos soins lors de la saisie d’un message au
                                sein du formulaire de contact.
                            </li>
                        </ul>
                        La collecte de ces informations est nécessaire pour permettre à TEDMOTOSPIECES de rentrer en
                        contact avec vous et de répondre à vos questions.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">2.2. DONNÉES COLLECTÉES LORS DE LA SAISIE
                        DU FORMULAIRE DE CRÉATION D’UN COMPTE-CLIENT</h3>
                    <h4 className="font-semibold text-gray-800 mt-4">2.2.1. Données collectées pour un compte-client
                        particulier</h4>
                    <p className="text-gray-700 mb-4">
                        Lors de la saisie du formulaire lié à la création d’un compte-client sur le Site Internet, nous
                        collectons les Données Personnelles suivantes :
                        <ul className="list-disc ml-5">
                            <li>votre adresse de courrier électronique ;</li>
                            <li>votre nom et votre prénom ;</li>
                            <li>votre adresse postale ;</li>
                            <li>votre numéro de téléphone fixe et/ou portable (obligation de renseigner au moins l’un
                                des deux) ;
                            </li>
                        </ul>
                        La collecte de ces informations est nécessaire pour assurer la création du compte-client, et par
                        la suite la passation et la validation des commandes.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">2.3. DONNÉES COLLECTÉES LORS DE LA
                        PASSATION D’UNE COMMANDE DEPUIS LE SITE INTERNET</h3>
                    <p className="text-gray-700 mb-4">
                        Afin de passer une commande depuis le Site Internet, il est obligatoire de disposer d’un
                        compte-client.
                        Afin d’assurer le traitement et l’expédition de vos commandes de produits passées depuis le Site
                        Internet, nous collectons les Données Personnelles suivantes :
                        <ul className="list-disc ml-5">
                            <li>votre adresse de livraison ;</li>
                            <li>le cas échéant, votre adresse de facturation (si différente de l’adresse de livraison)
                                ;
                            </li>
                            <li>les données nécessaires à la gestion de vos paiements.</li>
                        </ul>
                        La collecte de ces informations est nécessaire pour assurer un déroulement optimal du
                        traitement, du paiement et de l’expédition de vos commandes de produits passées depuis notre
                        Site Internet, ainsi que du traitement et du suivi des éventuelles réclamations.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">2.4. DONNÉES UTILISÉES À DES FINS DE
                        PROSPECTION COMMERCIALE</h3>
                    <p className="text-gray-700 mb-4">
                        Avec votre consentement exprès et préalable, TEDMOTOSPIECES utilise les Données Personnelles
                        susvisées (collectées lors de la création d’un compte-client et/ou d’une passation d’une
                        commande) afin de vous envoyer des newsletters, offres promotionnelles, offres spéciales et
                        autres opérations de marketing et de communication, le cas échéant personnalisées, liées aux
                        produits et services proposés par TEDMOTOSPIECES.
                        Vous êtes libre de retirer à tout moment votre consentement à de tels traitements. Toutefois,
                        tout traitement qui aurait eu lieu avant le retrait de votre consentement demeurera licite.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">2.5. DONNÉES UTILISÉES À DES FINS
                        D’INFORMATION SUR LA DISPONIBILITÉ DE PIÈCES</h3>
                    <p className="text-gray-700 mb-4">
                        Avec votre consentement exprès et préalable, TEDMOTOSPIECES peut utiliser les Données
                        Personnelles susvisées (collectées lors de la création d’un compte-client et/ou d’une passation
                        d’une commande) afin de vous informer de la disponibilité de nouvelles pièces concernant votre
                        véhicule.
                        Vous êtes libre de retirer à tout moment votre consentement à de tels traitements. Toutefois,
                        tout traitement qui aurait eu lieu avant le retrait de votre consentement demeurera licite.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">3. QUI A ACCES A VOS DONNEES PERSONNELLES
                        ?</h2>
                    <p className="text-gray-700 mb-4">
                        Le personnel habilité de TEDMOTOSPIECES a accès à vos Données Personnelles pour les finalités
                        précitées.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">4. QUELS SONT VOS DROITS SUR VOS DONNEES
                        PERSONNELLES ?</h2>
                    <p className="text-gray-700 mb-4">
                        Vous disposez des droits suivants sur les Données Personnelles qui sont collectées :
                        <ul className="list-disc ml-5">
                            <li>prendre connaissance, mettre à jour, modifier ou demander la suppression de vos Données
                                Personnelles ;
                            </li>
                            <li>demander la limitation et/ou vous opposer au traitement de vos Données Personnelles
                                depuis le Site Internet ;
                            </li>
                            <li>demander la portabilité et le transfert de vos Données Personnelles depuis le Site
                                Internet vers tout autre site internet ou application.
                            </li>
                        </ul>
                        Vous pouvez exercer les droits susvisés en contactant directement TEDMOTOSPIECES à l’adresse
                        e-mail suivante : contact@tedmotospieces.fr.
                        Vous disposez également du droit d’introduire une réclamation auprès de la CNIL (Commission
                        Nationale de l’Informatique et des Libertés – www.cnil.fr) ou de tout juge compétent.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">5. COMMENT ETES-VOUS INFORME(E) DES
                        MODIFICATIONS APPORTEES A LA POLITIQUE DE CONFIDENTIALITE ?</h2>
                    <p className="text-gray-700 mb-4">
                        Nous vous informons par e-mail des changements apportés à la présente politique de
                        confidentialité.
                    </p>
                    <p className="text-gray-700 mb-4">Dernière modification le 25/10/2024.</p>
                </section>
            </div>
        </ApplicationLayout>

    );
};

export default PrivacyPolicyPage;
