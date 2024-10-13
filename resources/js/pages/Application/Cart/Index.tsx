import React from 'react';
import {PageProps, User} from "@/types";
import ApplicationLayout from "@/layouts/ApplicationLayout";
import {Link, useForm, usePage} from "@inertiajs/react";
import {useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ParcelShopID, ParcelShopSelected} from "@frontboi/mondial-relay/types/parcel-shop";
import {getDeliveryPriceHT, ParcelShopSelector} from "@frontboi/mondial-relay";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useToast} from "@/hooks/use-toast";

const CartPage = ({ auth, cart, total, deliveryServiceRates, regions, departments } : PageProps<{cart: any, deliveryServiceRates: any, total: any, regions: any, departments: any}>) => {

    /**
     * Current delivery service selected (1: La Poste, 2: Mondial Relay)
     */
    const [currentDeliveryService, setCurrentDeliveryService] = useState(1);

    /**
     * Delivery price for the current cart
     */
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    /**
     * Current delivery service selected (1: La Poste, 2: Mondial Relay)
     */
    const [totalPrice, setTotalPrice] = useState(cart.items.reduce((acc: number, item: any) => {
        return acc + item.part.price;
    }, 0));

    /**
     * Current shop for Mondial Relay
     */
    const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>()

    /**
     * Current step of the cart (1: Cart, 2: Delivery service)
     */
    const [currentStep, setCurrentStep] = useState(1);


    const [currentRegion, setCurrentRegion] = useState('-');
    const [currentDepartment, setCurrentDepartment] = useState('-');
    const [currentCity, setCurrentCity] = useState('');
    const [currentPostalCode, setCurrentPostalCode] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');

    const csrf_token = usePage().props.csrf_token

    /**
     * Data for the form
     */
    const {data, setData, post, processing, errors, reset} = useForm({
        region: '',
        department: '',
        city: '',
        postal_code: '',
        address: '',
        delivery_service: currentDeliveryService,
        total_price: total,
        delivery_price: deliveryPrice,
    });

    /**
     * Is any item in the cart sold out
     */
    const isSoldOut = cart.items.some((item: any) => item.part.is_sold_out);

    /**
     * Is the cart empty
     */
    const isEmpty = cart.items.length === 0;

    /**
     * CSRF token
     */

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    }

    /**
     * Handle the change of the delivery service to La Poste
     */
    const handleSetDeliveryServiceToLaPoste = () => {

        let deliveryPrice: number = 0;

        // Separate rates by light and heavy
        const deliveryRates = {
            light: deliveryServiceRates.filter((rate: any) => rate.delivery_service.id === 1 && rate.min_weight !== undefined && rate.max_weight !== undefined),
            heavy: deliveryServiceRates.filter((rate: any) => rate.delivery_service.id === 2 && rate.min_weight !== undefined && rate.max_weight !== undefined)
        };

        // Calculate the delivery price for each item in the cart
        cart.items.forEach((item: any, index: number) => {
            const part = item.part;
            const weight = part.weight;

            const rate = part.is_heavy
                ? deliveryRates.heavy.find((rate: any) => rate.min_weight <= weight && rate.max_weight >= weight)
                : deliveryRates.light.find((rate: any) => rate.min_weight <= weight && rate.max_weight >= weight);

            if (rate) {
                // Convert the rate value to a number using parseFloat
                deliveryPrice += parseFloat(rate.rate);
            } else {
                console.warn(`No rate found for item ${index + 1} (is_heavy: ${part.is_heavy})`);
            }
        });

        setCurrentRegion('-');
        setCurrentDepartment('-');
        setCurrentCity('');
        setCurrentPostalCode('');
        setCurrentAddress('');

        data.delivery_service = 1;
        data.delivery_price = deliveryPrice;

        console.log("Delivery price", deliveryPrice);

        setDeliveryPrice(deliveryPrice);
        setCurrentDeliveryService(1);
    }

    /**
     * Handle the change of the delivery service to Mondial Relay
     */
    const handleSetDeliveryServiceToMondialRelay = () => {

        let deliveryPrice = 0;

        console.log("Parcel shop", parcelShop);

        // Calculate the delivery price for each item
        cart.items.forEach((item: any, index: number) => {
            const part = item.part;
            const price = getDeliveryPriceHT(part.weight * 1000, 'FR');
            if (price) {
                deliveryPrice += price;
            }
        });

        data.region = '-';
        data.department = '-';
        data.city = parcelShop?.Ville || '-';
        data.postal_code = parcelShop?.CP || '-';
        data.address =  parcelShop?.Nom + ' : ' + parcelShop?.Adresse1 || '-';
        data.delivery_service = 2;
        data.delivery_price = deliveryPrice;

        setCurrentRegion('-');
        setCurrentDepartment('-');
        setCurrentCity(parcelShop?.Ville || '');
        setCurrentPostalCode(parcelShop?.CP || '');
        setCurrentAddress(parcelShop?.Nom + ' : ' + parcelShop?.Adresse1 || '');

        setDeliveryPrice(deliveryPrice);
        setCurrentDeliveryService(2);
    }

    // Calculate the delivery price once the component is mounted
    React.useEffect(() => {
        handleSetDeliveryServiceToLaPoste();
    }, []);


    React.useEffect(() => {
        if (parcelShop) {
            handleSetDeliveryServiceToMondialRelay();
        }
    }, [parcelShop]);

    const handleRegionChange = (e: any) => {
        data.region = e.target.value;
        setCurrentRegion(e.target.value);
    }

    const handleDepartmentChange = (e: any) => {
        data.department = e.target.value;
        setCurrentDepartment(e.target.value);
    }

    const handleCityChange = (e: any) => {
        data.city = e.target.value;
        setCurrentCity(e.target.value);
    }

    const handlePostalCodeChange = (e: any) => {
        data.postal_code = e.target.value;
        setCurrentPostalCode(e.target.value);
    }

    const handleAddressChange = (e: any) => {
        data.address = e.target.value;
        setCurrentAddress(e.target.value);
    }


    /**
     * Handle the payment form submission
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Create a new form element
        const form = document.createElement('form');
        form.method = 'POST'; // Use 'GET' if appropriate
        form.action = route('checkout.process');

        // Create hidden inputs for the form data
        const inputs = [
            { name: '_token', value: csrf_token },
            { name: 'region', value: data.region },
            { name: 'department', value: data.department },
            { name: 'city', value: data.city },
            { name: 'postal_code', value: data.postal_code },
            { name: 'address', value: data.address },
            { name: 'delivery_service', value: data.delivery_service },
            { name: 'delivery_price', value: data.delivery_price },
            { name: 'total_price', value: data.total_price },
            { name: '_token', value: csrf_token },
        ];

        inputs.forEach(input => {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = input.name;
            hiddenField.value = input.value as string;
            form.appendChild(hiddenField);
        });

        // Open a new window
        const newWindow = window.open('', '_blank');

        if (newWindow) {
            // Append the form to the new window's document
            newWindow.document.body.appendChild(form);
            // Submit the form
            form.submit();
        }

    };



    return (
        <ApplicationLayout auth={auth} title={"Panier"}>
            <section className="bg-white">

                {currentStep === 1 ? (
                    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Panier
                        </h1>
                        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <div aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Les pièces dans votre panier
                                </h2>

                                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">

                                    {cart.items.length === 0 ? (
                                        <div
                                            className="mx-auto text-center border border-dashed border-gray-200 rounded-lg p-12">
                                            <h2 className="mt-2 text-lg font-medium text-gray-900">Aucun article trouvé</h2>
                                            <p className="mt-1 text-sm text-gray-500">Votre panier est vide.</p>
                                        </div>
                                    ) : null}


                                    {cart.items.map((item: any, itemIdx: any) => (
                                        <li key={itemIdx} className="flex py-6 sm:py-10">
                                            <div className="flex-shrink-0">
                                                <img
                                                    alt={''}
                                                    src={item.part.image[0]}
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                                />
                                                <Link href={route('cart.remove', {motorcycle_part_id: item.part.id})} className="mt-4 block text-sm font-medium text-red-600 hover:text-red-500" method={'post'}>
                                                    Retirer l'article
                                                </Link>
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a href={''}
                                                                   className="font-medium text-gray-700 hover:text-gray-800">
                                                                    <span
                                                                        className={'font-bold text-black'}>Nom: </span> {item.part.name}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex flex-col text-sm space-y-2">
                                                            <p className="text-gray-500">
                                                                <span
                                                                    className={'font-bold text-black'}>Type: </span> {item.part.type.name}
                                                            </p>
                                                            <p className="text-gray-500">
                                                                <span
                                                                    className={'font-bold text-black'}>Qualité: </span> {item.part.quality.name}
                                                            </p>
                                                            <p className="text-gray-500">
                                                                <span
                                                                    className={'font-bold text-black'}>Poids: </span> {item.part.weight} kg
                                                            </p>
                                                            {item.part.is_sold_out ? (
                                                                <p className="text-red-600">Épuisé</p>
                                                            ) : (
                                                                <p className="text-green-600">En stock</p>
                                                            )}
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">{

                                                            item.part.price}€
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Order summary */}
                            <section
                                aria-labelledby="summary-heading"
                                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Résumé de la commande
                                </h2>

                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">
                                            Prix des pièces
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {
                                                new Intl.NumberFormat('fr-FR', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                }).format(total)
                                            }
                                        </dd>
                                    </div>
                                    <p className={'text-sm text-gray-500'}>
                                        Les frais de livraison seront calculés à l'étape suivante.
                                    </p>

                                </dl>

                                <div>
                                    <div className="mt-6">
                                        <button
                                            onClick={handleNextStep}
                                            className={`w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${(isSoldOut || isEmpty) ? 'cursor-not-allowed' : 'hover:bg-red-700'}`}
                                            disabled={isSoldOut || isEmpty}>

                                            {isEmpty ? (
                                                <span className="ml-2">Votre panier est vide</span>
                                            ) : (
                                                isSoldOut ? (
                                                    <span className="ml-2">Commande non disponible</span>
                                                ) : (
                                                    <span className="ml-2">
                                                        Étape suivante
                                                    </span>
                                                )
                                            )}

                                        </button>
                                        {isSoldOut ? (
                                            <p className="mt-2 text-sm text-red-600" id="availability-description">
                                                Certains articles de votre panier sont actuellement en rupture de stock et
                                                ne peuvent pas être commandés.
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : null}


                {currentStep === 2 ? (
                    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            <div className={'flex gap-4'}>
                                <Button
                                    onClick={handlePreviousStep}
                                    className="text-sm font-semibold text-white hover:text-gray-600 mb-2"
                                >
                                    <ArrowLeft size={16} className={'mr-2'} /> Retour
                                </Button>
                                Mode de livraison
                            </div>
                        </h1>
                        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <div aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Choisissez un mode de livraison
                                </h2>

                                <div className={'flex justify-between gap-4'}>
                                    <Card className={`w-1/2 transition-transform duration-300 ease-in-out cursor-pointer ${currentDeliveryService === 1 ? 'border border-red-600' : 'border border-gray-200'}`} onClick={() => handleSetDeliveryServiceToLaPoste()}>
                                        <CardHeader>
                                            <CardTitle>
                                                La Poste
                                            </CardTitle>
                                            <CardDescription>
                                                Livraison à domicile
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>

                                    <Card className={`w-1/2 transition-transform duration-300 ease-in-out cursor-pointer ${currentDeliveryService === 2 ? 'border border-red-600' : 'border border-gray-200'}`} onClick={() => handleSetDeliveryServiceToMondialRelay()}>
                                        <CardHeader>
                                            <CardTitle>
                                                Mondial Relay
                                            </CardTitle>
                                            <CardDescription>
                                                Livraison en point relais
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>

                                {currentDeliveryService === 1 ? (
                                    <div className="mx-auto mt-4 sm:mt-4">

                                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                                            {/* Region */}
                                            <div>
                                                <label htmlFor="region"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Région
                                                </label>
                                                <select
                                                    id="region"
                                                    name="region"
                                                    defaultValue={regions[0].id}
                                                    onChange={(e) => handleRegionChange(e)}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">Sélectionnez une région</option>
                                                    {regions.map((region: any) => (
                                                        <option key={region.id}
                                                                value={region.name}>{region.name}</option>
                                                    ))}
                                                </select>
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.region}
                                                </p>
                                            </div>

                                            {/* Department */}
                                            <div>
                                                <label htmlFor="department"
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    Département
                                                </label>
                                                <select
                                                    id="department"
                                                    name="department"
                                                    defaultValue={departments[0].id}
                                                    onChange={(e) => handleDepartmentChange(e)}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">Sélectionnez un département</option>
                                                    {departments.map((department: any) => (
                                                        <option key={department.id} value={department.name}>{department.name}</option>
                                                    ))}
                                                </select>
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.department}
                                                </p>
                                            </div>

                                            {/* City */}
                                            <div className="sm:col-span-1">
                                                <label htmlFor="city"
                                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                                    Ville
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        placeholder={'Votre ville'}
                                                        onChange={(e) => handleCityChange(e)}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.city}
                                                </p>
                                            </div>

                                            {/* Postal code */}
                                            <div className="sm:col-span-1">
                                                <label htmlFor="postal_code"
                                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                                    Code postal
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        id="postal_code"
                                                        name="postal_code"
                                                        type="text"
                                                        placeholder={'Votre code postal'}
                                                        onChange={(e) => handlePostalCodeChange(e)}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.postal_code}
                                                </p>
                                            </div>

                                            {/* Address */}
                                            <div className="sm:col-span-2">
                                                <label htmlFor="address"
                                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                                    Adresse de livraison
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        id="address"
                                                        name="address"
                                                        type="text"
                                                        placeholder={'Votre adresse de livraison'}
                                                        onChange={(e) => handleAddressChange(e)}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.address}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                ) : null}

                                {currentDeliveryService === 2 ? (
                                    <div className={'mt-4'}>
                                        <ParcelShopSelector
                                            brandIdAPI="CC22XHU1"
                                            defaultCountry="FR"
                                            defaultPostcode="14000"
                                            allowedCountries="FR"
                                            onParcelShopSelected={setParcelShop}
                                        />
                                    </div>
                                ) : null}


                            </div>

                            {/* Order summary */}
                            <section
                                aria-labelledby="summary-heading"
                                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Résumé de la commande
                                </h2>


                                <dl className="mt-6 space-y-4">

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Région</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {currentRegion}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Département</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {currentDepartment}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Ville</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {currentCity}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Code postal</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {currentPostalCode}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Adresse de livraison</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {currentAddress}
                                        </dd>
                                    </div>


                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Frais de livraison</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {
                                                new Intl.NumberFormat('fr-FR', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                }).format(deliveryPrice)
                                            }
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Prix des pièces</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {
                                                new Intl.NumberFormat('fr-FR', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                }).format(total)
                                            }
                                        </dd>
                                    </div>
                                </dl>

                                <form onSubmit={handleSubmit}>
                                    {/* @ts-ignore */}
                                    <input type="hidden" name={'_token'} value={csrf_token}/>
                                    <input type="hidden" name={'delivery_price'} value={deliveryPrice}/>
                                    <div className="mt-6">
                                    <button type="submit"
                                                className={`w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${(isSoldOut || isEmpty) ? 'cursor-not-allowed' : 'hover:bg-red-700'}`}
                                                disabled={isSoldOut || isEmpty}>

                                            {isEmpty ? (
                                                <span className="ml-2">Votre panier est vide</span>
                                            ) : (
                                                isSoldOut ? (
                                                    <span className="ml-2">Commande non disponible</span>
                                                ) : (
                                                    <span className="ml-2">Passer la commande</span>
                                                )
                                            )}

                                        </button>
                                        {isSoldOut ? (
                                            <p className="mt-2 text-sm text-red-600" id="availability-description">
                                                Certains articles de votre panier sont actuellement en rupture de stock et
                                                ne peuvent pas être commandés.
                                            </p>
                                        ) : null}
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                ) : null}
            </section>
        </ApplicationLayout>
    );
};

export default CartPage;
