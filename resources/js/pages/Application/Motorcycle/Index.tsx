import ApplicationLayout from "@/layouts/ApplicationLayout";
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
import { PageProps } from '@/types';
import {useState} from "react";
import {classNames} from "@/utils/utils";

const MotorcyclePage = ({ auth, motorcycles}: PageProps<{ motorcycles: any }>) => {

    /**
     * Is the mobile filters dialog open
     */
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    /**
     * List of the motorcycles filtered by the selected filters
     */
    const [motorcyclesFiltered, setMotorcyclesFiltered] = useState(motorcycles.sort((a: any, b: any) => a.brand.name.localeCompare(b.brand.name)))

    /**
     * List of the sorting options
     */
    const [sortOptions, setSortOptions] = useState([{
        name: 'Trier par marque',
        href: '#',
        current: true
    }, {name: 'Trier par année croissante', href: '#', current: false}, {
        name: 'Trier par année décroissante',
        href: '#',
        current: false
    },])

    /**
     * List of the filters
     */
    const [filters, setFilters] = useState(() => {
        const filterMap: any = {};

        motorcycles.forEach((product: any) => {
            const continentSlug = product.brand.continent.slug;
            const continentName = product.brand.continent.name;
            const brandId = product.brand.id;
            const brandName = product.brand.name;

            if (filterMap[continentSlug]) {
                const brandExists = filterMap[continentSlug].options.some((option: any) => option.value === brandId);

                if (!brandExists) {
                    filterMap[continentSlug].options.push({
                        value: brandId, label: brandName, checked: false,
                    });
                }
            } else {
                filterMap[continentSlug] = {
                    id: continentSlug, name: continentName, options: [{
                        value: brandId, label: brandName, checked: false,
                    }],
                };
            }
        });

        return Object.values(filterMap);
    });

    /**
     * Handle the option selected for the sorting
     * @param name string - The name of the filter
     */
    const handleSortOption = (name: string) => {

        setSortOptions(sortOptions.map(option => ({
            ...option, current: option.name === name,
        })));

        if (name === 'Trier par marque') {
            setMotorcyclesFiltered(motorcyclesFiltered.sort((a: any, b: any) => a.brand.name.localeCompare(b.brand.name)));
        } else if (name === 'Trier par année croissante') {
            setMotorcyclesFiltered(motorcyclesFiltered.sort((a: any, b: any) => a.year - b.year));
        } else if (name === 'Trier par année décroissante') {
            setMotorcyclesFiltered(motorcyclesFiltered.sort((a: any, b: any) => b.year - a.year));
        }

    }

    /**
     * Handle the option selected for the filter
     * @param event React.ChangeEvent<HTMLInputElement> - The event of the input
     */
    const handleFilterOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Destructure the event
        const {name, checked, value} = event.target;

        // Get the brand name from the motorcycles
        const brand_name = motorcycles.find((product: any) => product.brand.id === parseInt(value))?.brand.name;

        if (checked) {
            if (motorcyclesFiltered.length === motorcycles.length) {
                const motorcyclesFiltered = motorcycles.filter((product: any) => product.brand.name === brand_name);
                setMotorcyclesFiltered(motorcyclesFiltered);
            } else {
                const motorcyclesToAdd = motorcycles.filter((product: any) => product.brand.name === brand_name);
                setMotorcyclesFiltered([...motorcyclesFiltered, ...motorcyclesToAdd]);
            }
        } else {
            const updatedmotorcyclesFiltered = motorcyclesFiltered.filter((product: any) => product.brand.name !== brand_name);

            if (updatedmotorcyclesFiltered.length === 0) {
                setMotorcyclesFiltered(motorcycles);
                return;
            }

            setMotorcyclesFiltered(updatedmotorcyclesFiltered);
        }
    };

    return (
        <ApplicationLayout auth={auth} title={"Motos"}>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
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
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>

                                    {filters.map((section: any, sectionIdx: any) => (<Disclosure key={sectionIdx} as="div"
                                                                                       className="border-t border-gray-200 px-4 py-6">
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
                                                            onChange={handleFilterOption}
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
                                Motos
                            </h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <MenuButton
                                            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Filtrer
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            {sortOptions.map((option, optionIdx) => (<MenuItem key={optionIdx}>
                                                <p
                                                    onClick={() => handleSortOption(option.name)}
                                                    className={classNames(option.current ? 'font-medium text-gray-900' : 'text-gray-500', 'block px-4 py-2 text-sm data-[focus]:bg-gray-100',)}
                                                >
                                                    {option.name}
                                                </p>
                                            </MenuItem>))}
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
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>

                                    {filters.map((section: any) => (
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
                                                                onChange={handleFilterOption}
                                                            />
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                   className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>))}
                                </form>

                                {/* Product grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-3">

                                    {motorcyclesFiltered.length === 0 && (<div
                                            className={'col-span-1 md:col-span-3 p-24 border border-dashed border-gray-200 rounded-md text-center'}>
                                            <p className={'text-lg font-medium text-gray-900'}>Aucun produit trouvé</p>
                                        </div>
                                    )}

                                    {motorcyclesFiltered.map((motorcycle: any, motorcycleIdx: any) => (
                                        <div key={motorcycleIdx} className="group relative">
                                            <Link href={route('motorcycles.part.index', {motorcycle_id: motorcycle.id})} className="font-medium text-gray-900">
                                                <div
                                                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                    <img
                                                        alt={'Product image'}
                                                        src={motorcycle.image}
                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                            <span aria-hidden="true" className="absolute inset-0"/>
                                                            {motorcycle.name}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">{motorcycle.brand.name}</p>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">{motorcycle.year}</p>
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

export default MotorcyclePage;
