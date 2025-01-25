import {Tab, TabGroup, TabList, TabPanel, TabPanels,} from '@headlessui/react'
import {PageProps} from "@/types";
import ApplicationLayout from "@/layouts/ApplicationLayout";
import {useToast} from "@/hooks/use-toast";
import {useForm} from "@inertiajs/react";

const MotorcyclePartDetailPage = ({auth, part, inCartOfTheCurrentUser, inCartOfAnyUser}: PageProps & {
    part: any,
    inCartOfTheCurrentUser: boolean,
    inCartOfAnyUser: boolean
}) => {

    const {toast} = useToast()

    const {data, setData, post, processing, errors, reset} = useForm({
        motorcycle_part_id: part.id
    });

    const submit = (e: any) => {
        e.preventDefault()
        post(route('cart.add', part.id), {
            onSuccess: () => {
                toast({
                    title: 'Pièce ajoutée au panier', description: 'La pièce a bien été ajoutée à votre panier',
                })
            }, onError: () => {
                toast({
                    title: 'Erreur',
                    description: 'Une erreur est survenue lors de l\'ajout de la pièce au panier',
                    variant: 'destructive'
                })
            }
        })
    }

    return (<ApplicationLayout auth={auth} title={"Détails de la pièce"}>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Image gallery */}
                        <TabGroup className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                                <TabList className="grid grid-cols-4 gap-6">
                                    {part.image.map((image: any, imageIdx: any) => (<Tab key={imageIdx}
                                                                                         className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                                    <img alt={'Photo numéro ' + imageIdx}
                                                         src={image}
                                                         className="h-full w-full object-contain object-center"/>
                                                </span>
                                            <span aria-hidden="true"
                                                  className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-red-500"
                                            />
                                        </Tab>))}
                                </TabList>
                            </div>

                            <TabPanels className="w-full">
                                {part.image.map((image: any, imageIdx: any) => (<TabPanel key={imageIdx}>
                                        <img alt={'Photo numéro ' + imageIdx} src={image}
                                             className="h-full w-full object-cover object-center sm:rounded-lg"/>
                                    </TabPanel>))}
                            </TabPanels>


                        </TabGroup>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                {part.name}
                            </h1>

                            <div className="mt-3">
                                <h2 className="sr-only">
                                    Détails du prix
                                </h2>
                                <p className="text-3xl tracking-tight text-gray-900">{part.price} €</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    dangerouslySetInnerHTML={{__html: part.description}}
                                    className="space-y-6 text-base text-gray-700 text-justify"
                                />
                            </div>

                            {part.is_heavy && (<div className="mt-6">
                                    <p className="mt-2 text-sm text-red-600">
                                        Attention, cette pièce ne peut être expédiée, en outre-mer en
                                        raison de son poids.
                                    </p>
                                </div>)}

                            <div className="mt-10 flex flex-col space-y-4">

                                {(inCartOfAnyUser && !inCartOfTheCurrentUser) && (
                                    <div className="rounded-md bg-red-50 p-4">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">
                                                    Attention cette pièce est déjà dans le panier d'un autre client,
                                                    dépêchez-vous de l'acheter avant qu'il ne soit trop tard !
                                                </h3>
                                            </div>
                                        </div>
                                    </div>)}

                                <form onSubmit={submit}>
                                    <button
                                        type="submit"
                                        disabled={!auth.user}
                                        className={`flex max-w-md flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full
                                                    ${auth.user ? 'hover:bg-red-700' : 'cursor-not-allowed'}
                                                    ${inCartOfTheCurrentUser ? 'bg-gray-300 text-gray-800 cursor-not-allowed' : 'bg-red-600 text-white'}`}>
                                        {auth.user ? (inCartOfTheCurrentUser ? ('Déjà dans le panier') : ('Ajouter au panier')) : ('Connectez-vous pour ajouter au panier')}
                                    </button>
                                </form>

                            </div>

                            <section className="mt-12 space-y-8">
                                <div>

                                    <ul role="list" className={'space-y-2'}>
                                        <li className={'text-sm text-gray-700'}>
                                            <span className={'font-bold'}>Moto:</span> {part.motorcycle.name}
                                        </li>
                                        <li className={'text-sm text-gray-700'}>
                                            <span className={'font-bold'}>Marque:</span> {part.motorcycle.brand.name}
                                        </li>
                                        <li className={'text-sm text-gray-700'}>
                                            <span className={'font-bold'}>Année:</span> {part.motorcycle.year}
                                        </li>
                                        <li className={'text-sm text-gray-700'}>
                                            <span className={'font-bold'}>Type de pièce:</span> {part.type.name}
                                        </li>
                                        <li className={'text-sm text-gray-700'}>
                                            <span className={'font-bold'}>Qualité:</span> {part.quality.name}
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </ApplicationLayout>)
};

export default MotorcyclePartDetailPage;
