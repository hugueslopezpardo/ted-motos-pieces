import ApplicationLayout from "@/layouts/ApplicationLayout";
import {PageProps, User} from "@/types";
import {Link} from "@inertiajs/react";

const ProfileOrder = ({ auth, orders }: PageProps<{ orders: any[] }>) => {
    return (
        <ApplicationLayout auth={auth} title={'Historique de commandes'}>
            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Vos commandes
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Retrouvez ici l'historique de vos commandes.
                    </p>
                </div>

                <div className="mt-12 space-y-16 sm:mt-16">

                    {orders.length === 0 ? (
                        <div className="mx-auto text-center border border-dashed border-gray-200 rounded-lg p-12">
                            <h2 className="mt-2 text-lg font-medium text-gray-900">Aucune commande trouvée</h2>
                            <p className="mt-1 text-sm text-gray-500">Vous n'avez pas encore passé de commande.</p>
                        </div>
                    ) : null}

                    {orders.map((order, orderIdx) => (
                        <section key={orderIdx} aria-labelledby={`${order.number}-heading`}>
                            <div className="space-y-1 text-sm md:flex md:items-baseline md:space-x-4 md:space-y-0">
                                <span className={'font-bold text-slate-700 mr-1'}>Statut de la commande: </span> {order.status.name}
                                <div
                                    className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                                    <p className="text-sm font-medium text-gray-500">{''}</p>
                                    <div className="flex text-sm font-medium">
                                        {/*
                                        <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                            <a href={route('invoice.invoice', order.id) } className="text-red-600 hover:text-red-500">
                                                Voir la facture
                                            </a>
                                        </div>
                                        */}
                                    </div>
                                </div>
                            </div>


                            <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                                {order.items.map((item: any, itemIdx: any) => (
                                    <div key={itemIdx} className="py-6 sm:flex">
                                        <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                                            <img
                                                alt={''}
                                                src={item.part.image}
                                                className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                                            />
                                            <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                                                <div className="truncate text-sm text-gray-500 space-y-2">
                                                    <div>
                                                        <span className={'font-bold text-slate-700'}>Nom:</span> {item.part.name}
                                                    </div>
                                                    <div>
                                                        <span className={'font-bold text-slate-700'}>Description:</span> {item.part.description}
                                                    </div>
                                                    <div>
                                                        <span className={'font-bold text-slate-700'}>Qualité: </span> {item.part.quality.name}
                                                    </div>
                                                    <div>
                                                        <span className={'font-bold text-slate-700'}>Type de pièce: </span>{item.part.type.name}
                                                    </div>
                                                    <div>
                                                        <span className={'font-bold text-slate-700'}>Poids: </span>{item.part.weight} kg
                                                    </div>
                                                    <div>
                                                        <span className={'font-bold text-slate-700'}>Prix: </span>{item.part.price} €
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </section>
                    ))}

                </div>
            </main>
        </ApplicationLayout>
    );
}

export default ProfileOrder;
