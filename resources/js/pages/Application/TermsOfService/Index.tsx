import React from 'react';
import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout"; // Updated import statement

const TermsOfServicePage = ({ auth }: PageProps) => {
    return (
        <ApplicationLayout auth={auth} title="Conditions général d'utilisation et de vente">
            <div className="container mx-auto p-6">
                <div className="container mx-auto p-6">
                    <section className="bg-white p-8 mb-10 space-y-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Conditions générales d'utilisation</h1>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">Acceptation des conditions</h2>
                        <p className="text-gray-700 mb-4">
                            Le client reconnaît avoir pris connaissance, au moment de la passation de commande, des
                            conditions de vente et déclare les accepter sans réserve.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Prix</h2>
                        <p className="text-gray-700 mb-4">
                            Le prix de chaque produit est exprimé en euros, à la date de vente. Il ne comprend pas le
                            transport. Toutes nos ventes sont payables au comptant par carte bancaire ou chèque.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">2. Garantie légale</h2>
                        <p className="text-gray-700 mb-4">
                            Le vendeur garantit l'acheteur contre les vices cachés de la pièce vendue selon les articles
                            du Code de la Consommation et du Code Civil (L.211-4, L.211-5, L.211-12, 1641 et suivants).
                        </p>

                        <h3 className="text-lg font-semibold text-gray-800 mt-4">Article L211-4</h3>
                        <p className="text-gray-700 mb-4">
                            Le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de
                            conformité existant lors de la délivrance.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Objet de la garantie
                            TEDMOTOSPIECES</h2>
                        <p className="text-gray-700 mb-4">
                            La garantie couvre les pièces détachées d'occasion testées et contrôlées vendues au détail,
                            à l'exclusion de certains éléments tels que les pneus et systèmes de sécurité.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Durée</h2>
                        <p className="text-gray-700 mb-4">
                            Les pièces font l'objet d'une garantie de 1 mois à compter de la date d'achat figurant sur
                            la facture ou le reçu.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">5. Information du client</h2>
                        <p className="text-gray-700 mb-4">
                            Les conditions de mise en œuvre de la garantie Tedmotospieces sont décrites dans les
                            conditions générales de Tedmotospieces.fr.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">6. Conditions générales d'exécution de
                            la garantie</h2>
                        <p className="text-gray-700 mb-4">
                            Pour que la garantie TEDMOTOSPIECES s'applique, le montage des pièces doit être conforme aux
                            normes constructeurs.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">8. Conditions particulières d'exécution
                            de la garantie</h2>
                        <p className="text-gray-700 mb-4">
                            La garantie peut être affectée pour des pièces telles que les transmissions, les
                            alternateurs, et autres systèmes particuliers.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">9. Pièces non garanties</h2>
                        <p className="text-gray-700 mb-4">
                            Certains groupes de pièces sont hors d'usage et sont vendus sans garantie, uniquement pour
                            la récupération de pièces.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">10. Exonération de la responsabilité du
                            vendeur</h2>
                        <p className="text-gray-700 mb-4">
                            L'entreprise TEDMOTOSPIECES se trouve dégagée de toute responsabilité si la défectuosité
                            provient d'une mauvaise utilisation ou d'une modification non autorisée.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">11. Règlement des litiges</h2>
                        <p className="text-gray-700 mb-4">
                            En cas de difficultés, l'acheteur peut rechercher une solution amiable avec TEDMOTOSPIECES
                            ou recourir à un tribunal compétent en cas d'échec de la médiation.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">12. Médiateur de la consommation</h2>
                        <p className="text-gray-700 mb-4">
                            Conformément à l'article L612-1 du Code de la Consommation, tout consommateur a le droit de
                            recourir gratuitement à un médiateur pour la résolution amiable de litiges.
                        </p>
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Conditions Générales de Vente</h1>
                        <p className="text-gray-700 mb-4">Valable à compter du 13 octobre 2023</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Objet</h2>
                        <p className="text-gray-700 mb-4">Les présentes conditions générales de vente ont pour objet
                            d'informer tout éventuel consommateur sur les conditions et modalités dans lesquelles le
                            vendeur procède à la vente et à la livraison des produits commandés, et de définir les
                            droits et obligations des parties dans le cadre de la vente de produits par la société
                            TEDMOTOSPIECES.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">2. Identité de l’entreprise</h2>
                        <p className="text-gray-700 mb-4">TEDMOTOSPIECES, 8b chemin de la croix nicolas, 14190
                            Maizières, Numéro Siret : 98058850300014.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Accès au Site</h2>
                        <p className="text-gray-700 mb-4">L'Acheteur fait son affaire personnelle de la mise en place
                            des moyens informatiques et de télécommunications permettant l'accès au site
                            "www.tedmotospieces.fr".</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Formation du contrat et
                            commandes</h2>
                        <h3 className="text-lg font-semibold text-gray-800 mt-4">4.1. Prix</h3>
                        <p className="text-gray-700 mb-4">Les prix de vente des produits en ligne sont indiqués en Euros
                            et sont ceux en vigueur au moment de l'enregistrement du bon de commande par l'Acheteur.</p>

                        <h3 className="text-lg font-semibold text-gray-800 mt-4">4.2. Caractéristiques des produits -
                            Disponibilité</h3>
                        <p className="text-gray-700 mb-4">L'Acheteur peut, préalablement à sa commande, prendre
                            connaissance des caractéristiques essentielles des produits qu'il désire commander.</p>

                        <h3 className="text-lg font-semibold text-gray-800 mt-4">4.3. Commande</h3>
                        <p className="text-gray-700 mb-4">En cas d'impossibilité de livrer la pièce commandée, nous vous
                            offrons le choix entre le remboursement ou un avoir. Si la pièce reçue ne correspond pas à
                            la commande, un échange sera proposé à nos frais.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">5. Paiement du prix</h2>
                        <p className="text-gray-700 mb-4">Le paiement de la totalité du prix doit être réalisé lors de
                            la commande par l'Acheteur. A aucun moment, les sommes versées ne pourront être considérées
                            comme des arrhes ou acomptes.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">6. Choix des produits</h2>
                        <p className="text-gray-700 mb-4">L'Acheteur est seul juge de la compatibilité des pièces
                            commandées avec celles utilisées par lui.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">7. Livraison et réception</h2>
                        <p className="text-gray-700 mb-4">Les produits seront livrés à l'adresse indiquée par
                            l'Acheteur. L'Acheteur doit vérifier l'état de l'emballage et du contenu à la livraison.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">8. Disponibilité des produits</h2>
                        <p className="text-gray-700 mb-4">En cas d'indisponibilité du produit commandé, TEDMOTOSPIECES
                            informera l'Acheteur au plus tôt.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">9. Droit de Rétractation</h2>
                        <p className="text-gray-700 mb-4">Conformément à l'article L121-20 du Code de la Consommation,
                            l'Acheteur dispose d'un délai de sept jours francs à compter de la date de réception, pour
                            retourner à ses frais, les produits commandés, pour échange ou remboursement.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">10. Conditions générales de
                            remboursement</h2>
                        <p className="text-gray-700 mb-4">Tout remboursement sera effectué par chèque, dans un délai
                            maximum de trente jours.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">11. Réserve de propriété</h2>
                        <p className="text-gray-700 mb-4">TEDMOTOSPIECES conserve la propriété pleine et entière des
                            produits vendus jusqu'au parfait encaissement du prix.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">12. Garantie</h2>
                        <p className="text-gray-700 mb-4">Certaines pièces vendues bénéficient d'une garantie, dont les
                            conditions générales varient suivant leur nature.</p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-4">13. Responsabilité</h2>
                        <p className="text-gray-700 mb-4">TEDMOTOSPIECES ne pourra être tenue pour responsable de
                            l’inexécution du contrat en cas de rupture de stock ou indisponibilité du produit, de force
                            majeure, de perturbation ou grève.</p>
                    </section>
                </div>
            </div>
        </ApplicationLayout>
    );
};

export default TermsOfServicePage;
