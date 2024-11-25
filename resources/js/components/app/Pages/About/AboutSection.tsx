const AboutSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-4 py-16" id={'about'}>
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
                        <div className="aspect-h-3 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1590505512927-d04e249ce3e2?q=80&w=3701&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="object-cover object-center"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                À propos de nous
                            </h2>
                            <p className="mt-6 leading-8 text-gray-700 text-justify">
                                Ted Motos Pièces, basée à Caen, au cœur du Calvados, est une entreprise spécialisée
                                dans la vente de pièces détachées d'occasion pour motos de sport et roadsters. Forte
                                d'une expertise développée au fil des années, Ted Motos Pièces s'impose comme un acteur
                                incontournable pour les passionnés de deux-roues à la recherche de qualité et de
                                performance, tout en favorisant une approche économique et durable. Que vous soyez un
                                amateur
                                de vitesse ou un professionnel cherchant des composants spécifiques, l'entreprise
                                propose une large
                                gamme de pièces d'occasion soigneusement sélectionnées, répondant aux besoins des motos
                                de sport et roadsters les plus exigeantes. Du système de freinage aux kits d'embrayage,
                                en passant par les carénages et les échappements, Ted Motos Pièces offre des produits
                                provenant de sources fiables, garantissant ainsi sécurité et fiabilité à chaque
                                commande.
                            </p>
                            <p className="mt-6 leading-8 text-gray-700 text-justify">
                                En choisissant Ted Motos Pièces, les motards bénéficient non seulement d'une sélection
                                rigoureuse de pièces d'occasion de qualité, mais aussi d'un service client exemplaire.
                                Située à Caen, l'entreprise allie proximité et expertise pour répondre aux demandes les
                                plus complexes.
                                Avec un site de vente en ligne performant et une équipe dédiée, Ted Motos Pièces assure
                                une livraison rapide
                                dans toute la France, permettant aux passionnés de motos de remettre rapidement leur
                                véhicule en état ou
                                de l’améliorer tout en respectant leur budget. Que ce soit pour des conseils techniques
                                ou pour trouver
                                une pièce rare, Ted Motos Pièces se distingue par son engagement à fournir des solutions
                                sur mesure
                                à chaque client, tout en contribuant à une consommation plus responsable et durable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
