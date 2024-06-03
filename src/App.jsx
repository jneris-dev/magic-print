import React, { useEffect, useState, useRef } from "react";

import { Modal } from "./components/Modal";
import { Menu } from "./components/Menu";
import { pageModel } from "./model/page.model";

export function App() {
    let printStorage = sessionStorage.getItem('pagesOfPrint') || undefined;

    const componentRef = useRef();

    const [modal, setModal] = useState({
        id: '',
        state: false,
        page: ''
    });
    const [menu, setMenu] = useState(false)
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
    ])
    
    function arrayDifference(arr1, arr2) {
        const difference = [];

        const forMax = arr2.length >= arr1.length ? arr2.length : arr1.length
    
        for (let i = 0; i < forMax; i++) {
            if (arr2.indexOf(arr1[i]) === -1) {
                if(arr2[i])
                    difference.push(arr2[i]);
                else
                difference.push(arr1[i]);
            }
        }
    
        return difference;
    }

    function removePage(index) {
        if(index !== 0)
            pages.splice(index, 1)
        else
            pages[0] = pageModel
        
        setPages([ ...pages ])
        sessionStorage.setItem('pagesOfPrint', JSON.stringify(pages))
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
        <main className="flex flex-col gap-10 items-center justify-center my-5 mx-auto relative">
            <Menu
                refPrint={componentRef}
                menu={menu}
                setMenu={setMenu}
                pages={pages}
                setPages={setPages}
            />
            <div className="flex flex-col items-center justify-center gap-10" id="wrap-print" ref={componentRef}>
                {pages.length > 0 && pages.map((page, index) => {
                    var checkEmpty = page.cards.filter(obj=> obj.name !== '').length <= 0;

                    return (
                        <div className={`page relative${checkEmpty ? ' empty' : ''}`} key={index}>
                        <div className="absolute top-5 right-0 items-center justify-center w-full logo-wrap hidden">
                            <img src="/logo.png" className="max-w-full w-[180px]" alt="" />
                        </div>
                            <button
                                type="button"
                                onClick={() => removePage(index)}
                                className="absolute top-0 -left-10 bg-red-600 hover:bg-red-700 transition-all text-white w-8 h-8 flex items-center justify-center"
                            >
                                <svg fill="#FFF" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                            </button>
                            {page.cards.map((i, k) => {
                                if(i.url === '')
                                    return (
                                        <div
                                            className={`card cursor-pointer hover:ring-2 hover:ring-neutral-500 rounded-xl transition-all back`}
                                            key={k}
                                            onClick={() => setModal({ id: k, state: true, page: index})}
                                        />
                                    )
                                else
                                    return (
                                        <div
                                            className={`card cursor-pointer hover:ring-2 hover:ring-neutral-500 rounded-xl transition-all relative group`}
                                            key={k}
                                            onClick={() => {
                                                page.cards[k].name = ''
                                                page.cards[k].url = ''

                                                setPages([...pages])
                                                sessionStorage.setItem('pagesOfPrint', JSON.stringify(pages))
                                            }}
                                        >
                                            <div className="absolute w-full h-full hidden transition-all items-center justify-center bg-neutral-900/50 text-white group-hover:flex rounded-xl">
                                                <svg className="fill-neutral-200 w-20 h-20" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                                            </div>
                                            <img
                                                src={i.url}
                                                alt={i.name}
                                                title={i.name}
                                                className="max-h-full rounded-xl"
                                            />
                                        </div>
                                    )
                            })}
                        </div>
                    )
                })}
            </div>
            <Modal modal={modal} setModal={setModal} pages={pages} setCardsByPage={setPages} />
        </main>
    )
}