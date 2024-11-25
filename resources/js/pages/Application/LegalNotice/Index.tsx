import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";

const LegalNotice = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title={'Mentions Légales'}>
            <div className="container mx-auto p-6">
                <section className="bg-white p-8 mb-10 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Mentions Légales</h1>
                    <p className="text-gray-700 mb-4">
                        Le présent site (Tedmotospieces.fr) est la propriété de l’entreprise Tedmotospieces.<br/>
                        Nom du site : www.tedmotospieces.fr
                    </p>
                    <p className="text-gray-700 mb-4">
                        Siège Social : 8b chemin de la croix nicolas 14190 Maizieres<br/>
                        SIRET : 98058850300014<br/>
                        Tél. : 0672197343<br/>
                        Email : contact@tedmotospieces.fr<br/>
                        Hébergement : <a href="https://www.hostinger.fr/contact" className="text-blue-600">HOSTINGER
                        INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Chypre.</a>
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Conditions d’utilisation du site :</h2>
                    <p className="text-gray-700 mb-4">
                        L’utilisateur du site Internet reconnaît disposer de la compétence et des moyens nécessaires
                        pour accéder et utiliser ce site. Il reconnaît également avoir pris connaissance de la présente
                        notice légale et s’engage à la respecter. TEDMOTOSPIECES s’efforce de vérifier l’ensemble des
                        informations figurant sur le présent site au moment de leur publication et de les mettre
                        régulièrement à jour, mais ne peut garantir de manière absolue l’exactitude et l’exhaustivité de
                        ces informations. Par conséquent, TEDMOTOSPIECES ne saurait être tenu responsable de tout
                        préjudice résultant de l’accès ou de l’utilisation de ce site.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">1- Propriété intellectuelle</h2>
                    <p className="text-gray-700 mb-4">
                        Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans
                        l’autorisation expresse de l’exploitant du site Internet est interdite et constituerait une
                        contrefaçon sanctionnée par les articles L 335-2 et suivants du Code de la propriété
                        intellectuelle.<br/>
                        Il en est de même des éventuelles bases de données figurant sur le site Internet qui sont
                        protégées par les dispositions de la loi du 11 juillet 1998 portant transposition dans le Code
                        de la propriété intellectuelle (CPI) de la directive européenne du 11 mars 1996 relative à la
                        protection juridique des bases de données.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Les liens hypertextes mis en place dans le cadre du site Internet en direction d’autres
                        ressources présentes sur le réseau de l’Internet, et notamment vers ses partenaires ont fait
                        l’objet d’une autorisation préalable expresse et écrite.<br/>
                        Les utilisateurs visiteurs du site Internet ne peuvent mettre en place un hyperlien en direction
                        de ces sites sans l’autorisation expresse et préalable de l’exploitant du site Internet.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">2- Données personnelles :</h2>
                    <p className="text-gray-700 mb-4">
                        Certaines informations personnelles peuvent vous être demandées afin que nous soyons en mesure
                        de vous identifier, de vous proposer des services, d’améliorer le site et d’être à votre écoute.
                        Ces informations personnelles vous permettront notamment de :
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-700">
                        <li>Passer une commande de produits</li>
                        <li>Vous abonner à notre lettre d’information (newsletter), par l’intermédiaire de laquelle nous
                            pourrons éventuellement vous transmettre des messages de nos partenaires.
                        </li>
                        <li>Nous poser une question par l’intermédiaire de la rubrique « contactez-nous »</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        Conformément à la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux
                        libertés, vous disposez d’un droit d’accès, de rectification et de suppression des données vous
                        concernant en écrivant à contact@tedmotospieces.fr ou à TEDMOTOSPIECES, en indiquant vos nom,
                        prénom, adresse postale et mail.
                    </p>
                </section>
            </div>
        </ApplicationLayout>
    );
};

export default LegalNotice;
