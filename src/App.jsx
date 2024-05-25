import React, { useEffect, useState, useRef } from "react";

import { Modal } from "./components/Modal";

export function App() {
    let printStorage = sessionStorage.getItem('pagesOfPrint') || undefined;

    const componentRef = useRef(null);

    const [modal, setModal] = useState({
        id: '',
        state: false,
        page: ''
    });
    const [pages, setPages] = useState([
        {
            cards: [
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
            ]
        },
        {
            cards: [
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
                {
                    name: '',
                    url: ''
                },
            ]
        },
    ])
    
    function arrayDifference(arr1, arr2) {
        const difference = [];
    
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) === -1) {
                if(arr2[i])
                    difference.push(arr2[i]);
                else
                difference.push(arr1[i]);
            }
        }
    
        return difference;
    }

    useEffect(() => {
        if(printStorage) {
            const storage = JSON.parse(printStorage)
            const diff = arrayDifference(pages, storage);

            if(diff.length > 0)
                setPages(diff)
        }
    }, [printStorage])

    return (
        <main className="flex flex-col gap-10 items-center justify-center p-10">
            {pages.map((page, index, row) => {
                return (
                    <React.Fragment key={index}>
                        <div className="page" ref={componentRef}>
                            {page.cards.map((i, k) => {
                                return (
                                    <div
                                        className={`card cursor-pointer hover:ring-2 hover:ring-neutral-500 rounded-xl transition-all ${i.url === '' ? 'back' : ''}`}
                                        key={k}
                                        onClick={() => setModal({ id: k, state: true, page: index})}
                                    >
                                        {i.url !== '' &&
                                            <img
                                                src={i.url}
                                                alt={i.name}
                                                title={i.name}
                                                className="max-h-full rounded-xl"
                                            />
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </React.Fragment>
                )
            })}

            <Modal modal={modal} setModal={setModal} pages={pages} setCardsByPage={setPages} />
        </main>
    )
}