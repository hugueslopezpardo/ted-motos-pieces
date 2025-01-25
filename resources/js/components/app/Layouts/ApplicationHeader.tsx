'use client';

import {PageProps} from "@/types";
import {FormEventHandler, Fragment, useState} from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link, useForm, usePage} from "@inertiajs/react";
import {Text} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

function classNames(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}
// @ts-ignore

const navigation = {
    categories: [
        {
            id: 'products',
            name: 'Produits',
            featured: [
                {
                    name: 'Motos',
                    href: route('motorcycles.index'),
                    imageSrc: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Découvrez nos motos',
                    description: 'Découvrez notre sélection de motos',
                },
                {
                    name: 'Accessoires',
                    href: route('motorcycles.accessories'),
                    imageSrc: 'https://images.unsplash.com/photo-1558981396-5fcf84bdf14d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1vdG9yYmlrZSUyMHBhcnRzfGVufDB8fDB8fHww',
                    imageAlt: 'Découvrez tous nos accessoires',
                    description: 'Découvrez tous nos accessoires',
                },
            ],
            sections: [
                [
                    {
                        id: 'brands',
                        name: 'Marques',
                        items: [
                            { name: 'Kawasaki', href: route('motorcycles.index', { continent: 'asie', brand: 'kawasaki' }) },
                            { name: 'Suzuki', href: route('motorcycles.index', { continent: 'asie', brand: 'suzuki' }) },
                            { name: 'Honda', href: route('motorcycles.index', { continent: 'asie', brand: 'honda' }) },
                            { name: 'Yamaha', href: route('motorcycles.index', { continent: 'asie', brand: 'yamaha' }) },
                            { name: 'Tout voir', href: route('motorcycles.index') },
                        ],
                    },
                    {
                        id: 'parts-mechanical',
                        name: 'Mécaniques',
                        items: [
                            { name: 'Shifter', href: route('motorcycles.search', { category: 'mecanique', subcategory: 'shifter' }) },
                            { name: 'Moteur', href: route('motorcycles.search', { category: 'mecanique', subcategory: 'moteur' }) },
                            { name: 'Suspension', href: route('motorcycles.search', { category: 'mecanique', subcategory: 'suspension' }) },
                            { name: 'Carénage', href: route('motorcycles.search', { category: 'mecanique', subcategory: 'carenage' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'mecanique' }) },
                        ],
                    },
                ],
                [
                    {
                        id: 'parts-electrical',
                        name: 'Électriques',
                        items: [
                            { name: 'Accessoires', href: route('motorcycles.search', { category: 'electrique', subcategory: 'accessoires' }) },
                            { name: 'Batteries', href: route('motorcycles.search', { category: 'electrique', subcategory: 'batteries' }) },
                            { name: 'Commodo', href: route('motorcycles.search', { category: 'electrique', subcategory: 'commodo' }) },
                            { name: 'Compteur', href: route('motorcycles.search', { category: 'electrique', subcategory: 'compteur' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'electrique' }) },
                        ],
                    },
                    {
                        id: 'fuel-system',
                        name: 'Carburants',
                        items: [
                            { name: 'Pompe à Carburant', href: route('motorcycles.search', { category: 'systeme-de-carburant', subcategory: 'pompe-a-carburant' }) },
                            { name: 'Injecteurs', href: route('motorcycles.search', { category: 'systeme-de-carburant', subcategory: 'injecteurs' }) },
                            { name: 'Réservoir', href: route('motorcycles.search', { category: 'systeme-de-carburant', subcategory: 'reservoir-de-carburant' }) },
                            { name: 'Carburateur', href: route('motorcycles.search', { category: 'systeme-de-carburant', subcategory: 'carburateur' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'systeme-de-carburant' }) },
                        ],
                    },
                ],
                [
                    {
                        id: 'transmission',
                        name: 'Transmissions',
                        items: [
                            { name: 'Embrayage', href: route('motorcycles.search', { category: 'transmission', subcategory: 'embrayage' }) },
                            { name: 'Chaînes', href: route('motorcycles.search', { category: 'transmission', subcategory: 'chaines' }) },
                            { name: 'Pignons', href: route('motorcycles.search', { category: 'transmission', subcategory: 'pignons' }) },
                            { name: 'Boîte de vitesses', href: route('motorcycles.search', { category: 'transmission', subcategory: 'boite-de-vitesses' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'transmission' }) },
                        ],
                    },
                    {
                        id: 'brake-system',
                        name: 'Freinages',
                        items: [
                            { name: 'Système de freinage', href: route('motorcycles.search', { category: 'systeme-de-freinage', subcategory: 'systeme-frein' }) },
                            { name: 'Disques', href: route('motorcycles.search', { category: 'systeme-de-freinage', subcategory: 'disques' }) },
                            { name: 'Plaquettes', href: route('motorcycles.search', { category: 'systeme-de-freinage', subcategory: 'plaquettes' }) },
                            { name: 'Câbles de frein', href: route('motorcycles.search', { category: 'systeme-de-freinage', subcategory: 'cables-de-frein' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'systeme-de-freinage' }) },
                        ],
                    },
                ],
                [
                    {
                        id: 'cooling-system',
                        name: 'Refroidissements',
                        items: [
                            { name: 'Radiateurs', href: route('motorcycles.search', { category: 'systeme-de-refroidissement', subcategory: 'radiateur' }) },
                            { name: 'Ventilateurs', href: route('motorcycles.search', { category: 'systeme-de-refroidissement', subcategory: 'ventilateur' }) },
                            { name: 'Thermostats', href: route('motorcycles.search', { category: 'systeme-de-refroidissement', subcategory: 'thermostats' }) },
                            { name: 'Pompe à eau', href: route('motorcycles.search', { category: 'systeme-de-refroidissement', subcategory: 'pompe-a-eau' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'systeme-de-refroidissement' }) },
                        ],
                    },
                ],
                [
                    {
                        id: 'adaptations',
                        name: 'Adaptables',
                        items: [
                            { name: 'Silencieux', href: route('motorcycles.search', { category: 'adaptable', subcategory: 'mufflers' }) },
                            { name: 'Racing', href: route('motorcycles.search', { category: 'adaptable', subcategory: 'racing' }) },
                            { name: 'Pneumatiques', href: route('motorcycles.search', { category: 'adaptable', subcategory: 'tires' }) },
                            { name: 'Accessoires', href: route('motorcycles.search', { category: 'adaptable', subcategory: 'accessories' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'adaptable' }) },
                        ],

                    },
                ],
                [
                    {
                        id: 'exhaust-system',
                        name: 'Échappements',
                        items: [
                            { name: 'Silencieux', href: route('motorcycles.search', { category: 'systeme-d-echappement', subcategory: ' echappement' }) },
                            { name: 'Collecteurs', href: route('motorcycles.search', { category: 'systeme-d-echappement', subcategory: 'collecteurs' }) },
                            { name: 'Catalyseurs', href: route('motorcycles.search', { category: 'systeme-d-echappement', subcategory: 'catalyseurs' }) },
                            { name: 'Tout voir', href: route('motorcycles.search', { category: 'systeme-d-echappement' }) },
                        ],
                    },
                ],
            ],
        },
    ],
    pages: [
        { name: 'Accueil', href: route('welcome.index') },
        { name: 'À propos', href: route('about.index') },
        { name: 'Contact', href: route('contact.index') },
    ],
}

export default function ApplicationHeader({ auth } : PageProps) {

    const [open, setOpen] = useState(false)

    { /* @ts-ignore */ }
    const nb_products = usePage().props.auth.nb_products;

    /**
     * Search form
     */
    const { data, setData, post, processing, errors } = useForm({
        search_query: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('search.index'), {
            onSuccess: () => {

            },
            onError: () => {

            }
        });
    }

    return (
        <>
            {/* Top bar */}
            <div className="bg-red-700">
                <div
                    className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none hidden sm:block">
                        Livraison dans toute la France métropolitaine
                    </p>

                    <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        {auth.user ? (
                            <Link href={route('logout')} method="post" className="text-sm font-medium text-white hover:text-gray-100" >
                                Déconnexion
                            </Link>
                        ) : (
                            <div className={'space-x-2'}>
                                <Link href={route('register')} className="text-sm font-medium text-white hover:text-gray-300 ">
                                    Créer un compte
                                </Link>
                                <span aria-hidden="true" className="h-6 w-px bg-white"/>
                                <Link href={route('login')} className="text-sm font-medium text-white hover:text-gray-300">
                                    Se connecter
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <div className="bg-white z-50 ">
                {/* Mobile menu */}
                <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <div className="flex px-4 pb-2 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                >
                                    <span className="sr-only">
                                        Fermer le menu principal
                                    </span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                </button>
                            </div>

                            <div className="space-y-6 border-t border-gray-200 px-4 pt-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                            {page.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Links */}
                            <TabGroup className="mt-2">
                                <div className="border-b border-gray-200">
                                    <TabList className="-mb-px flex space-x-8 px-4">
                                        {navigation.categories.map((category) => (
                                            <Tab
                                                key={category.name}
                                                className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-red-600 data-[selected]:text-red-600"
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </TabList>
                                </div>
                                <TabPanels>
                                    {navigation.categories.map((category) => (
                                        <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                            <div className="space-y-4">
                                                {category.featured.map((item, itemIdx) => (
                                                    <div
                                                        key={itemIdx}
                                                        className="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100"
                                                    >
                                                        <img
                                                            alt={item.imageAlt}
                                                            src={item.imageSrc}
                                                            className="object-cover object-center group-hover:opacity-75"
                                                        />
                                                        <div className="flex flex-col justify-end">
                                                            <div
                                                                className="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                                                                <Link href={item.href}
                                                                      className="font-medium text-gray-900">
                                                                    <span aria-hidden="true"
                                                                          className="absolute inset-0"/>
                                                                    {item.name}
                                                                </Link>
                                                                <p aria-hidden="true"
                                                                   className="mt-0.5 text-gray-700 sm:mt-1">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((column, columnIdx) => (
                                                <div key={columnIdx} className="space-y-10">
                                                    {column.map((section) => (
                                                        <div key={section.name}>
                                                            <p id={`${category.id}-${section.id}-heading-mobile`}
                                                               className="font-medium text-gray-900">
                                                                {section.name}
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                className="mt-6 flex flex-col space-y-6"
                                                            >
                                                                {section.items.map((item) => (
                                                                    <li key={item.name} className="flow-root">
                                                                        <Link href={item.href}
                                                                              className="-m-2 block p-2 text-gray-500">
                                                                            {item.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </TabGroup>
                        </DialogPanel>
                    </div>
                </Dialog>

                <header className="relative z-50">
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center justify-between">
                                <div className="lg:hidden ">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(true)}
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                    >
                                        <span className="sr-only">
                                            Ouvrir le menu principal
                                        </span>
                                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                                    </button>
                                </div>

                                {/* Flyout menus */}
                                <PopoverGroup className="hidden lg:block lg:flex-1 lg:self-stretch">
                                    <div className="flex h-full space-x-8">

                                        <Link href={route('welcome.index')} className="flex items-center text-sm font-medium text-gray-700 hover:text-red-700">
                                            Accueil
                                        </Link>

                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                <div className="relative flex">
                                                    <PopoverButton
                                                        className="group relative z-10 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-red-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:text-red-600">
                                                        {category.name}
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-200 ease-out group-data-[open]:bg-red-600 sm:mt-5 sm:translate-y-px sm:transform"
                                                        />
                                                    </PopoverButton>
                                                </div>

                                                <PopoverPanel
                                                    transition
                                                    className="absolute inset-x-0 top-full transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                                >
                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                    <div aria-hidden="true"
                                                         className="absolute inset-0 top-1/2 bg-white shadow"/>

                                                    <div className="relative bg-white">
                                                        <div className="mx-auto max-w-7xl px-8">
                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                <div
                                                                    className="grid grid-cols-1 grid-rows-1 gap-8 text-sm">
                                                                    {category.featured.map((item, itemIdx) => (
                                                                        <div
                                                                            key={item.name}
                                                                            className={'aspect-w-2 col-span-2 group aspect-h-1 relative overflow-hidden rounded-md bg-gray-100'}
                                                                        >
                                                                            <img
                                                                                alt={item.imageAlt}
                                                                                src={item.imageSrc}
                                                                                className="object-cover object-center group-hover:opacity-75"
                                                                            />
                                                                            <div className="flex flex-col justify-end">
                                                                                <div
                                                                                    className="bg-white bg-opacity-60 p-4 text-sm">
                                                                                    <Link href={item.href}
                                                                                          className="font-medium text-gray-900">
                                                                                        <span aria-hidden="true"
                                                                                              className="absolute inset-0"/>
                                                                                        {item.name}
                                                                                    </Link>
                                                                                    <p aria-hidden="true"
                                                                                       className="mt-0.5 text-gray-700 sm:mt-1">
                                                                                        {item.description}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-x-8 gap-y-10 text-sm text-gray-500">
                                                                    {category.sections.map((column, columnIdx) => (
                                                                        <div key={columnIdx} className="space-y-10">
                                                                            {column.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p
                                                                                        id={`${category.id}-${section.id}-heading`}
                                                                                        className="font-medium text-gray-900"
                                                                                    >
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${category.id}-${section.id}-heading`}
                                                                                        className="mt-4 space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name}
                                                                                                className="flex">
                                                                                                <Link href={item.href}
                                                                                                      className="hover:text-red-700">
                                                                                                    {item.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverPanel>
                                            </Popover>
                                        ))}

                                        <Link href={route('about.index')} className="flex items-center text-sm font-medium text-gray-700 hover:text-red-700">
                                            À propos
                                        </Link>

                                        <Link href={route('contact.index')} className="flex items-center text-sm font-medium text-gray-700 hover:text-red-700">
                                            Contact
                                        </Link>

                                    </div>
                                </PopoverGroup>


                                <div className="flex flex-1 items-center justify-end">
                                    {/* Search */}
                                    <div className="grid w-full grid-cols-1 sm:max-w-xs">
                                        <input
                                            name="search"
                                            placeholder="Rechercher un produit"
                                            aria-label="Search"
                                            className="col-start-1 row-start-1 block w-full rounded-md py-1.5 pl-10 pr-3 border-2 border-gray-200 text-base outline-none placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm/6"
                                            onChange={(e) => setData('search_query', e.target.value)}
                                        />
                                        <MagnifyingGlassIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                        />
                                    </div>
                                    <Button onClick={submit} className="ml-4">
                                        Rechercher <ArrowRight className={'ml-2'} size={16} />
                                    </Button>

                                    {/* Account */}
                                    <Link href={route('profile.index')}
                                          className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4 hover:text-red-700">
                                        <span className="sr-only">
                                            Mon compte
                                        </span>
                                        <UserIcon aria-hidden="true" className="h-6 w-6"/>
                                    </Link>

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Link href={route('cart.index')} className="group -m-2 flex items-center space-x-1 p-2">
                                            <ShoppingBagIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-red-700"
                                            />
                                            <Text className={'text-sm font-medium text-gray-400 group-hover:text-red-700'}>
                                                {nb_products}
                                            </Text>
                                            <span className="sr-only">
                                                Panier
                                            </span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );

}
