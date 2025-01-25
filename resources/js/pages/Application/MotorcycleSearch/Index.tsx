import { PageProps } from '@/types';
import ApplicationLayout from "@/layouts/ApplicationLayout";
import React, { useState, useEffect } from "react";
import {
    Dialog, Disclosure, Menu,
    MenuButton, MenuItem, MenuItems
} from '@headlessui/react';
import { Link, usePage } from "@inertiajs/react";
import {FunnelIcon, MinusIcon, PlusIcon} from "@heroicons/react/20/solid";

const MotorcyclePartPage = ({ auth }: PageProps<{ motorcycleParts: any, categories: any, types: any }>) => {

    const { props }: any = usePage();

    const [motorcycleParts, setMotorcycleParts] = useState(props.motorcycleParts);

    console.log(motorcycleParts);

    return (
        <ApplicationLayout auth={auth} title={"Pièces"}>
            <div className="bg-white">
                {/* Filter dialog for mobile */}

                {/* Main content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Filters section */}
                    <section aria-labelledby="filter-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Motorcycle parts grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-3">
                                {motorcycleParts.length === 0 && (
                                    <div className="col-span-1 md:col-span-3 p-24 border border-dashed border-gray-200 rounded-md text-center">
                                        <p className="text-lg font-medium text-gray-900">
                                            Aucun produit trouvé
                                        </p>
                                    </div>
                                )}
                                {motorcycleParts.map((item: any, itemIdx: any) => (
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

export default MotorcyclePartPage;
