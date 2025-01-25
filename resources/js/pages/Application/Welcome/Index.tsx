import {Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import {ArrowPathIcon} from "@heroicons/react/16/solid";
import ApplicationLayout from "@/layouts/ApplicationLayout";
import {BanknoteIcon, CalendarIcon} from "lucide-react";
import AboutSection from "@/components/app/Pages/About/AboutSection";

const collections = [
    {
        name: "Honda",
        href: route('motorcycles.index', {continent: 'asie', brand: 'honda'}),
        src: '/assets/images/shared/logos/logo-honda.png',
        alt: 'Collection Honda',
    }, {
        name: "Suzuki",
        href: route('motorcycles.index', {continent: 'asie', brand: 'suzuki'}),
        src: '/assets/images/shared/logos/logo-suzuki.png',
        alt: 'Collection Suzuki',
    }, {
        name: 'Yamaha',
        href: route('motorcycles.index', {continent: 'asie', brand: 'yamaha'}),
        src: '/assets/images/shared/logos/logo-yamha.png',
        alt: 'Collection Yahama',
    },
    {
        name: 'Kawasaki',
        href: route('motorcycles.index', {continent: 'asie', brand: 'kawasaki'}),
        src: '/assets/images/shared/logos/logo-kawasaki.png',
        alt: 'Collection Kawasaki',
    },
];

const perks = [{
    name: 'Une garantie de qualité',
    description: 'En cas de problème, nous vous remboursons',
    icon: CalendarIcon
}, {
    name: 'Pas satisfait',
    description: 'Vous avez 14 jours pour retourner un produit',
    icon: ArrowPathIcon
}, {name: 'Paiement en plusieurs fois', description: 'Payez jusqu\'à 3 fois sans frais', icon: BanknoteIcon},];


const WelcomePage = ({auth, trending}: PageProps<{ trending: any[] }>) => {
    return (<ApplicationLayout auth={auth} title="Accueil">
            <section>
                <div className="relative">
                    {/* Background image and overlap */}
                    <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
                        <div className="relative w-full flex-1 bg-gray-800">
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    alt="Fond d'écran"
                                    src="/assets/images/pages/welcome/welcome-hero.png"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gray-900 opacity-50"/>
                        </div>
                        <div className="h-32 w-full bg-white md:h-40 lg:h-48"/>
                    </div>

                    <div className="relative mx-auto max-w-6xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
                        {/* Background image and overlap */}
                        <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
                            <div className="relative w-full flex-1 bg-gray-800">
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        alt="Fond d'écran"
                                        src="/assets/images/pages/welcome/welcome-hero.png"
                                        className="h-full w-full object-fill"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900 opacity-50"/>
                            </div>
                            <div className="h-48 w-full bg-white"/>
                        </div>
                        <div className="relative py-32">
                            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-8xl space-y-4">
                                <div>
                                    Vente moto
                                </div>
                                <div>
                                    Pièces détachées
                                </div>
                                <div>
                                    toutes marques
                                </div>
                            </h1>
                            <div className="mt-4 sm:mt-6">
                                <Link href={route('motorcycles.index')}
                                      className="inline-block rounded-md border border-transparent bg-red-600 px-8 py-3 font-medium text-white hover:border-white hover:text-white hover:bg-transparent transition duration-150 ease-in-out">
                                    Parcourir les produits
                                </Link>
                            </div>
                        </div>
                    </div>

                    <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
                        <h2 id="collection-heading" className="sr-only">
                            Collections
                        </h2>
                        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-4 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
                            {collections.map((collection) => (<div
                                    key={collection.name}
                                    className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
                                >
                                    <div>
                                        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                                            <div className="absolute inset-0 overflow-hidden">
                                                <img
                                                    alt={collection.alt}
                                                    src={collection.src}
                                                    className="h-full w-full object-contain p-8 object-center transition duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-125"
                                                />
                                            </div>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"/>
                                        </div>
                                        <div className="absolute inset-0 flex items-end rounded-lg p-6">
                                            <div>
                                                <p aria-hidden="true" className="text-sm text-white">
                                                    Découvrez la collection
                                                </p>
                                                <h3 className="mt-1 font-semibold text-white">
                                                    <Link href={collection.href}>
                                                        <span className="absolute inset-0"/>
                                                        {collection.name}
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>))}
                        </div>
                    </section>
                </div>
            </section>

            <section className="bg-white my-20">
                <h2 className="sr-only">
                    Notre engagement
                </h2>
                <div
                    className="mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-x lg:divide-y-0 lg:py-8">
                    {perks.map((perk, perkIdx) => (<div key={perkIdx} className="py-8 lg:w-1/3 lg:flex-none lg:py-0">
                            <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
                                <perk.icon aria-hidden="true"
                                           className="h-8 w-8 flex-shrink-0 text-red-600"/>
                                <div className="ml-4 flex flex-auto flex-col-reverse">
                                    <h3 className="font-medium text-gray-900">{perk.name}</h3>
                                    <p className="text-sm text-gray-500">{perk.description}</p>
                                </div>
                            </div>
                        </div>))}
                </div>
            </section>

            <section aria-labelledby="category-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-baseline sm:justify-between">
                        <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                            Nos collections
                        </h2>
                        <Link href={route('motorcycles.index')}
                              className="hidden text-sm font-semibold text-red-600 hover:text-red-500 sm:block">
                            Voir tous les produits
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                        <div
                            className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 transition duration-300 ease-in-out hover:filter hover:brightness-125">
                            <img
                                alt="Voir toutes les motos"
                                src="https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
                            />
                            <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50"/>
                            <div className="flex items-end p-6">
                                <div>
                                    <h3 className="font-semibold text-white">
                                        <Link href={route('motorcycles.index')}>
                                            <span className="absolute inset-0"/>
                                            Découvrez nos motos
                                        </Link>
                                    </h3>
                                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                                        Voir toutes les motos
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 transition duration-300 ease-in-out hover:filter hover:brightness-125">
                            <img
                                alt="Voir toutes les pièces détachées"
                                src="https://images.unsplash.com/photo-1558981396-5fcf84bdf14d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1vdG9yYmlrZSUyMHBhcnRzfGVufDB8fDB8fHww"
                                className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
                            />
                            <div
                                aria-hidden="true"
                                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                            />
                            <div className="flex items-end p-6 sm:absolute sm:inset-0">
                                <div>
                                    <h3 className="font-semibold text-white">
                                        <Link href={route('motorcycles.search')}>
                                            <span className="absolute inset-0"/>
                                            Découvrez nos pièces détachées
                                        </Link>
                                    </h3>
                                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                                        Voir toutes les pièces détachées
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:hidden">
                        <a href="#" className="block text-sm font-semibold text-red-600 hover:text-red-500">
                            Voir tous les produits
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </section>

            <AboutSection/>


            <section aria-labelledby="favorites-heading">
                <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-7 lg:px-8">
                    <div className="sm:flex sm:items-baseline sm:justify-between">
                        <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                            Nos dernières nouveautés
                        </h2>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">

                        {trending.length === 0 && (
                            <div className="text-gray-500">Aucun produit n'est disponible pour le moment.</div>)}

                        {trending.map((trend, trendIdx) => (<div key={trendIdx}
                                                                 className="group relative group-hover:duration-200 hover:brightness-125 transition duration-300 ease-in-out">
                                <div
                                    className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 sm:h-auto">
                                    <img
                                        alt={'Photo de la moto ' + trend.name}
                                        src={trend.image}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-gray-900">
                                    <Link href={route('motorcycles.part.index', {motorcycle_id: trend.id})}>
                                        <span className="absolute inset-0"/>
                                        {trend.name}
                                    </Link>
                                </h3>
                                <div className={'flex justify-between'}>
                                    <p className="mt-1 text-sm text-gray-500">{trend.year}</p>
                                    <p className="mt-1 text-sm text-gray-500">{trend.brand.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </ApplicationLayout>);
};

export default WelcomePage;
