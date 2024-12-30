import React from "react";

export function OpeningView() {
    return (
        <>
          {/* Espace sous la navbar */}
      <div className="mt-20"></div>
        <div >
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl rounded-lg bg-black p-2">Horaires d'ouverture</h2>
                <p className="mt-3 text-lg text-white">
                Nous sommes ouverts du mardi au dimanche. <br />  Venez nous rendre visite !
                </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-8 ">
                <div className="rounded-lg bg-black p-2">
                <h3 className="text-lg leading-6 font-medium text-white ">mardi - dimanche</h3>
                <dl className="mt-2 text-base text-white">
                    <div>
                    <dt className="sr-only">Heures d'ouverture</dt>
                    <dd>12h - 14h30</dd>
                    </div>
                </dl>
                </div>
                <div className="rounded-lg bg-black p-2">
                <h3 className="text-lg leading-6 font-medium text-white">mercredi - samedi</h3>
                <dl className="mt-2 text-base text-white">
                    <div>
                    <dt className="sr-only">Heures d'ouverture</dt>
                    <dd>19h - 22h30</dd>
                    </div>
                </dl>
                </div>
            </div>
            </div>
        </div>
        </div>
        </>
    );
    }