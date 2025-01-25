import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Link, useForm} from "@inertiajs/react";
import {useToast} from "@/hooks/use-toast";
import {FormEventHandler, useState} from "react";

const navigation = {
    legal: [
        {name: 'Conditions Générales', href: route('terms-of-service.index')},
        {name: 'Politique de Confidentialité', href: route('privacy-policy.index')},
        {name: 'Paiement Sécurisé', href: route('secure-payment.index')},
        {name: 'Mentions Légales', href: route('legal-notice.index')},
        {name: 'Livraison', href: route('delivery.index')},
    ],
    social: [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/people/Ted-Motos-Pieces/61553164143146/',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
}


export default function ApplicationFooter() {

    const { toast } = useToast()

    const [isAgreed, setIsAgreed] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
        is_agreed: isAgreed,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset('first_name', 'last_name', 'email', 'message')
                toast({
                    title: 'Message envoyé',
                    description: 'Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais.',
                    duration: 3000,
                });
            },
            onError: () => {
                toast({
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de l\'envoi de votre message, veuillez réessayer.',
                    duration: 3000,
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <>
            <section>
                <div className="isolate bg-gray-50 px-6 py-16 sm:py-16 lg:px-8" id={'contact'}>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Nous contacter
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Pour toute question ou demande d'information, n'hésitez pas à nous contacter en
                            remplissant le formulaire ci-dessous.
                        </p>
                    </div>
                    <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={submit}>
                        <div className="flex flex-col gap-y-6">
                            <div>
                                <label htmlFor="first-name"
                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                    Prénom
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        defaultValue={data.first_name}
                                    />
                                </div>
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.first_name}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="last-name"
                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                    Nom
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        defaultValue={data.last_name}
                                    />
                                </div>
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.last_name}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setData('email', e.target.value)}
                                        defaultValue={data.email}
                                    />
                                </div>
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="message"
                                       className="block text-sm font-semibold leading-6 text-gray-900">
                                    Message
                                </label>
                                <div className="mt-2.5">
                          <textarea
                              id="message"
                              name="message"
                              rows={4}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                              onChange={(e) => setData('message', e.target.value)}
                              defaultValue={data.message}
                          />
                                </div>
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.message}
                                </p>
                            </div>
                            <div className="flex items-center w-full text-sm text-gray-600 space-x-2">
                                <Checkbox id="terms" onChange={() => setIsAgreed(!isAgreed)}
                                          className={'text-red-600'}/>
                                <Label htmlFor="terms" className="text-gray-600 leading-6">
                                    En soumettant ce formulaire, j'accepte que mes informations soient utilisées{' '}
                                    <Link href={route('privacy-policy.index')}
                                          className="font-semibold text-red-600">
                                        conformément à la politique de confidentialité{' '}
                                    </Link>
                                    et j'accepte les{' '}
                                    <Link href={route('terms-of-service.index')}
                                          className="font-semibold text-red-600">
                                        conditions générales d'utilisation.
                                    </Link>
                                </Label>
                            </div>
                            <p className="mt-1 text-sm text-red-600">
                                {errors.is_agreed}
                            </p>
                        </div>
                        <div className="mt-10">
                            <button type="submit"
                                    className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                J'envoie mon message
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <footer aria-labelledby="footer-heading" className="bg-gray-900">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 sm:pt-24 lg:px-8 lg:pt-32">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="space-y-8">
                            <img
                                alt="Company name"
                                src="/assets/images/shared/logos/logo-transparent.png"
                                className="h-24"
                            />
                            <p className="text-sm leading-6 text-gray-300">
                                Une entreprise familiale spécialisée dans la vente de pièces détachées
                                toutes marques.
                            </p>
                            <div className="flex space-x-6">
                                {navigation.social.map((item) => (
                                    <a key={item.name} href={item.href}
                                       className="text-gray-500 hover:text-gray-400">
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon aria-hidden="true" className="h-6 w-6"/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex justify-between items-center">
                        <p className="text-xs leading-5 text-gray-400">&copy;
                            Tout droits réservés. Ted Motos &amp; Pièces. {new Date().getFullYear()} & HLP.
                        </p>
                        <div className="flex text-left md:text-center flex-col md:flex-row space-x-0 md:space-x-6">
                            {navigation.legal.map((item) => (
                                <a key={item.name} href={item.href} className="text-xs text-gray-400 hover:text-gray-300">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
