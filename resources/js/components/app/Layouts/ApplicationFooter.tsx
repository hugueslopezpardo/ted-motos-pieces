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
