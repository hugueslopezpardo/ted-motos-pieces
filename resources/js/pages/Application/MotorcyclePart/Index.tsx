import {PageProps, User} from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";
import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon} from '@heroicons/react/20/solid'
import {Link} from "@inertiajs/react";
import {classNames} from "@/utils/utils";



const MotorcyclePartPage = ({ auth, motorcycle }: PageProps<{ motorcycle: any }>) => {

    /**
     * Is the mobile filters open
     */
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    /**
     * The filters
     */
    const [motorcyclePartsFiltered, setMotorcyclePartsFiltered] = useState(motorcycle.parts);

    /**
     * The qualities checked
     */
    const [qualitiesFilters, setQualitiesFilters] = useState<string[]>([]);

    /**
     * The types checked
     */
    const [typesFilters, setTypesFilters] = useState<string[]>([]);

    /**
     * The filters option to display
     */
    const sortOptions = [
        {name: 'Prix croissant', current: false},
        {name: 'Prix décroissant', current: false},
    ];

    /**
     * All the qualities
     */
    const qualities = motorcycle.parts.map((part: any) => part.quality.name).filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    /**
     * All the types
     */
    const types = motorcycle.parts.map((part: any) => part.type.name).filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    /**
     * Sort the quality by alphabetical order
     */
    qualities.sort();

    /**
     * Sort the types by alphabetical order
     */
    types.sort();

    /**
     * Handle the filter option
     */
    const filters = [
        {
            id: 'quality',
            name: 'Qualité',
            options: qualities.map((value: any) => ({value, label: value})),
        },
        {
            id: 'type',
            name: 'Type',
            options: types.map((value: any) => ({value, label: value})),
        },
    ];


    // Handle the option selected for the filter
    const handleFilterOption = (event: React.ChangeEvent<HTMLInputElement>, filterType: string) => {
        const { value, checked } = event.target;

        console.log(value, checked, filterType);

        // Update the appropriate filter state based on the filter type
        if (filterType === 'quality') {
            setQualitiesFilters((prevFilters) => {
                if (checked) {
                    return [...prevFilters, value]; // Add selected quality
                } else {
                    return prevFilters.filter((filter) => filter !== value); // Remove deselected quality
                }
            });
        } else if (filterType === 'type') {
            setTypesFilters((prevFilters) => {
                if (checked) {
                    return [...prevFilters, value]; // Add selected type
                } else {
                    return prevFilters.filter((filter) => filter !== value); // Remove deselected type
                }
            });
        }
    };

    // Apply filters to the motorcycle parts
    useEffect(() => {
        // Filter parts based on selected qualities and types
        let filteredParts = motorcycle.parts;

        // Apply quality filters if any are selected
        if (qualitiesFilters.length > 0) {
            filteredParts = filteredParts.filter((part: any) => qualitiesFilters.includes(part.quality.name));
        }

        // Apply type filters if any are selected
        if (typesFilters.length > 0) {
            filteredParts = filteredParts.filter((part: any) => typesFilters.includes(part.type.name));
        }

        // Update the filtered parts state
        setMotorcyclePartsFiltered(filteredParts);
    }, [qualitiesFilters, typesFilters]);

    return (
        <ApplicationLayout auth={auth} title={"Pièces"}>
            <div className="bg-white">
                <div>
                    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    >
                                        <span className="sr-only">
                                            Fermer le menu
                                        </span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                    </button>
                                </div>

                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>

                                    {filters.map((section, sectionIdx) => (
                                        <Disclosure key={sectionIdx} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton
                                                className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden"/>
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden"/>
                        </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option: any, optionIdx: any) => (
                                                    <div key={optionIdx} className="flex items-center">
                                                        <input
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                            onChange={(event) => handleFilterOption(event, section.id as 'quality' | 'type')}
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>))}
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                Pièces disponibles
                            </h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <MenuButton
                                            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Filtres
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems transition className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                        <div className="py-1">
                                            {sortOptions.map((option, optionIdx) => (<MenuItem key={optionIdx}>
                                                    <p
                                                        // onClick={() => handleSortOption(option.name)}
                                                        className={classNames(option.current ? 'font-medium text-gray-900' : 'text-gray-500', 'block px-4 py-2 text-sm data-[focus]:bg-gray-100',)}
                                                    >
                                                        {option.name}
                                                    </p>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>

                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                >
                                    <span className="sr-only">Filtrer</span>
                                    <FunnelIcon aria-hidden="true" className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="motorcycles-heading" className="pb-24 pt-6">
                            <h2 id="motorcycles-heading" className="sr-only">
                                motorcycles
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton
                                                    className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                      <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden"/>
                                                      <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden"/>
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option: any, optionIdx: any) => (
                                                        <div key={optionIdx} className="flex items-center">
                                                            <input
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                                onChange={(event) => handleFilterOption(event, section.id as 'quality' | 'type')}
                                                            />
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                   className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </form>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-3">

                                    {motorcyclePartsFiltered.length === 0 && (<div
                                        className={'col-span-1 md:col-span-3 p-24 border border-dashed border-gray-200 rounded-md text-center'}>
                                        <p className={'text-lg font-medium text-gray-900'}>Aucun produit trouvé</p>
                                    </div>)}

                                    {motorcyclePartsFiltered.map((item: any, itemIdx: any) => (
                                        <div key={itemIdx} className="group relative">
                                            <Link href={route('motorcycles.part.detail.index', {motorcycle_part_id: item.id})}>
                                                <div
                                                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                    <img
                                                        alt={'motorcycle image'}
                                                        src={item.image[0]}
                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                            <span aria-hidden="true" className="absolute inset-0"/>
                                                            {item.name}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {item.type.name} - {item.quality.name}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.price} €
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </ApplicationLayout>
    );
};

export default MotorcyclePartPage;
