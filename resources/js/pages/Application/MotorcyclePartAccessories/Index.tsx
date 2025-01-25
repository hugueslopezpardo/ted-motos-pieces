import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";
import React, { useState, useEffect } from "react";
import {
    Dialog, Disclosure, Menu,
    MenuButton, MenuItem, MenuItems
} from '@headlessui/react';
import { Link, usePage } from "@inertiajs/react";
import {FunnelIcon, MinusIcon, PlusIcon} from "@heroicons/react/20/solid";

const MotorcyclePartAccessoriesPage = ({ auth }: PageProps<{ motorcycleParts: any, categories: any, types: any }>) => {

    const { props }: any = usePage();

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<any>(false);
    const [filteredParts, setFilteredParts] = useState<any>(props.motorcycleParts);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [typeFilters, setTypeFilters] = useState<string[]>([]);
    const [qualityFilters, setQualityFilters] = useState<string[]>([]);

    // Sort options
    const sortOptions = [
        { name: 'Prix croissant', current: false },
        { name: 'Prix décroissant', current: false },
    ];

    // Get all qualities, categories (type.category), and types
    const qualities = props.motorcycleParts.map((part: any) => part.quality.name)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    const categories = props.motorcycleParts.map((part: any) => part.type.category.name)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    const types = props.motorcycleParts.map((part: any) => part.type.name)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    const filters: any = [];

    if (categories.length > 0) {
        filters.push({
            id: 'category',
            name: 'Catégories',
            options: categories.map((category: any) => ({ label: category, value: category })),
        });
    }

    if (types.length > 0) {
        filters.push({
            id: 'type',
            name: 'Types',
            options: types.map((type: any) => ({ label: type, value: type })),
        });
    }

    if (qualities.length > 0) {
        filters.push({
            id: 'quality',
            name: 'Qualités',
            options: qualities.map((quality: any) => ({ label: quality, value: quality })),
        });
    }

    // Handle filter option for category, type, or quality
    const handleFilterOption = (event: React.ChangeEvent<HTMLInputElement>, filterType: 'category' | 'type' | 'quality') => {
        const { value, checked } = event.target;

        if (filterType === 'category') {
            setCategoryFilters((prevFilters) => {
                if (checked) {
                    return [...prevFilters, value];
                } else {
                    return prevFilters.filter((filter) => filter !== value);
                }
            });
        } else if (filterType === 'type') {
            setTypeFilters((prevFilters) => {
                if (checked) {
                    return [...prevFilters, value];
                } else {
                    return prevFilters.filter((filter) => filter !== value);
                }
            });
        } else if (filterType === 'quality') {
            setQualityFilters((prevFilters) => {
                if (checked) {
                    return [...prevFilters, value];
                } else {
                    return prevFilters.filter((filter) => filter !== value);
                }
            });
        }
    };

    // Filter parts based on the selected filters
    useEffect(() => {
        let filtered: any = props.motorcycleParts;

        // Filter by categories
        if (categoryFilters.length > 0) {
            filtered = filtered.filter((part: any) => categoryFilters.includes(part.type.category.name));
        }

        // Filter by types
        if (typeFilters.length > 0) {
            filtered = filtered.filter((part: any) => typeFilters.includes(part.type.name));
        }

        // Filter by qualities
        if (qualityFilters.length > 0) {
            filtered = filtered.filter((part: any) => qualityFilters.includes(part.quality.name));
        }

        setFilteredParts(filtered);
    }, [categoryFilters, typeFilters, qualityFilters, props.motorcycleParts]);

    return (
        <ApplicationLayout auth={auth} title={"Pièces"}>
            <div className="bg-white">
                {/* Filter dialog for mobile */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
                    {/* Mobile filter content */}
                </Dialog>

                {/* Main content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Pièces disponibles</h1>
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="-m-2 p-2 text-gray-400 lg:hidden"
                        >
                            <FunnelIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Filters section */}
                    <section aria-labelledby="filter-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filter form */}
                            <form className="hidden lg:block">
                                {filters.map((section: any, sectionIdx: any) => (
                                    <Disclosure
                                        key={sectionIdx}
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                    >
                                        <Disclosure.Button className="group flex items-center justify-between w-full text-sm text-gray-500">
                                    <span className="font-medium text-gray-900">
                                        {section.name}
                                    </span>
                                            <span className="ml-6 flex items-center">
                                        <PlusIcon className="h-5 w-5 group-open:hidden" />
                                        <MinusIcon className="h-5 w-5 hidden group-open:block" />
                                    </span>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option: any, optionIdx: any) => (
                                                    <div key={optionIdx} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            value={option.value}
                                                            type="checkbox"
                                                            onChange={(e) => {
                                                                const newFilters = e.target.checked
                                                                    ? [...(section.id === 'category' ? categoryFilters : typeFilters), option.value]
                                                                    : (section.id === 'category'
                                                                            ? categoryFilters
                                                                            : typeFilters
                                                                    ).filter(
                                                                        (f) => f !== option.value
                                                                    );

                                                                if (section.id === 'category')
                                                                    setCategoryFilters(newFilters);
                                                                else setTypeFilters(newFilters);
                                                            }}
                                                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 text-sm text-gray-600"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Motorcycle parts grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-3">
                                {filteredParts.length === 0 && (
                                    <div className="col-span-1 md:col-span-3 p-24 border border-dashed border-gray-200 rounded-md text-center">
                                        <p className="text-lg font-medium text-gray-900">
                                            Aucun produit trouvé
                                        </p>
                                    </div>
                                )}
                                {filteredParts.map((item: any, itemIdx: any) => (
                                    <div key={itemIdx} className="group relative">
                                        <Link
                                            href={route('motorcycles.part.detail.index', {motorcycle_part_id: item.id})}>
                                            <div
                                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                <img
                                                    src={item.image[0]}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover lg:h-full lg:w-full"
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
        </ApplicationLayout>
    );
};

export default MotorcyclePartAccessoriesPage;
