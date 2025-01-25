import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="h-screen flex items-center justify-center">
                {/* Conteneur avec l'image et le dégradé */}
                <div className="absolute inset-0 -z-10">
                    <img
                        alt=""
                        src="/assets/images/pages/welcome/welcome-hero.png"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Dégradé noir en overlay */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

                {/* Contenu textuel centré */}
                <div className="text-center px-6 py-32 sm:py-40">
                    <p className="text-pretty text-lg font-medium text-white/70 sm:text-xl">
                        Erreur 404
                    </p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        La page que vous cherchez n'existe pas
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl">
                        Malheureusement, la page que vous cherchez n'existe pas. Vous pouvez revenir à la page d'accueil
                    </p>
                    <div className="mt-10 flex justify-center">
                        <Link href={route('welcome.index')}>
                            <Button variant={'outline'} size={'lg'} className={'border-2 border-red-500  hover:text-white hover:bg-transparent bg-red-500 text-white'}>
                                Revenir à la page d'accueil <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
    );
}
