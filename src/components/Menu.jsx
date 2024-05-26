import { useEffect } from "react";
import { useReactToPrint } from 'react-to-print';

import { pageModel } from "../model/page.model";

export function Menu({menu, setMenu, refPrint, pages, setPages}) {

    const handlePrint = useReactToPrint({
        content: () => refPrint.current,
        removeAfterPrint: true,
    });

    const addPage = () => {
        const model = pageModel

        pages.push(model);

        setPages([...pages])
    }

    const allClean = () => {
        pages = []

        pages.push(pageModel)

        setPages([...pages])
        
        sessionStorage.setItem('pagesOfPrint', JSON.stringify(pages))
    }

    useEffect(() => {
        const dropdownButton = document.getElementById('dropdown-button');
        const dropdownMenu = document.getElementById('dropdown-menu');

        window.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                setMenu(false);
            }
        });
    }, [])

    return (
        <div className="fixed right-5 top-5">
            <button
                id="dropdown-button"
                type="button"
                onClick={() => setMenu(!menu)}
                className="p-2 bg-neutral-600 rounded"
            >
                <svg className="fill-neutral-400" width={'24'} height={'24'} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z" fillRule="nonzero"/></svg>
            </button>
            <div
                id="dropdown-menu"
                className={`${menu ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
            >
                <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                    <button
                        type="button"
                        onClick={() => {handlePrint(), setMenu(false)}}
                        className="flex w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                        role="menuitem"
                    >
                        Imprimir
                    </button>
                    <button
                        type="button"
                        onClick={() => {addPage(), setMenu(false)}}
                        className="flex w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                        role="menuitem"
                    >
                        +Página
                    </button>
                    <button
                        type="button"
                        onClick={() => {allClean(), setMenu(false)}}
                        className="flex w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                        role="menuitem"
                    >
                        Limpar Tudo
                    </button>
                </div>
            </div>
        </div>
    );
}