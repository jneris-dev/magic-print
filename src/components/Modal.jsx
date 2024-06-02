import { useState } from "react";
import classNames from "classnames";
import axios from "axios";

export function Modal({modal, setModal, pages, setCardsByPage}) {
    const [fields, setFields] = useState({
        name: '',
        url: ''
    })
    const [loadingSearch, setLoadingSearch] = useState(false)

    const modalClass = classNames(
        "fixed inset-0 w-screen h-screen bg-neutral-700 bg-opacity-40 justify-center z-50 md:p-10 p-5 backdrop-blur-sm items-start",
        {
            "hidden": !modal.state,
            "flex": modal.state
        }
    )

    const modalContent = classNames(
        `w-full max-w-md h-auto bg-neutral-50 shadow rounded-xl flex flex-col`
    )

    function addCard() {
        pages[modal.page].cards[modal.id].name = fields.name.trim()
        pages[modal.page].cards[modal.id].url = fields.url.trim()

        setCardsByPage([...pages])

        sessionStorage.setItem('pagesOfPrint', JSON.stringify(pages))

        setTimeout(() => {
            setModal({
                id: '',
                page: '',
                state: false
            })
        }, 100)
    }

    async function searchCardByName() {
        setLoadingSearch(true)

        setFields({...fields, url: ''});
        
        await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(fields.name)}&lang=pt`).then((resp) => {
            var cardpt = resp.data

            if (cardpt.image_uris) {
                setFields({...fields, url: cardpt.image_uris.normal});
            } else if (cardpt.card_faces) {
                setFields({...fields, url: cardpt.card_faces[0].image_uris.normal});
            } else {
                axios.get(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(fields.name)}`).then((response) => {
                    var card = response.data

                    if (card.image_uris) {
                        setFields({...fields, url: card.image_uris.normal});
                    } else if (card.card_faces) {
                        setFields({...fields, url: card.card_faces[0].image_uris.normal});
                    } else {
                        setFields({...fields});
                    }
                }).catch((err) => {
                    console.error(err)
                })
            }

            setTimeout(() => {
                setLoadingSearch(false)
            }, 300)
        }).catch((err) => {
            console.error(err)

            setTimeout(() => {
                setLoadingSearch(false)
            }, 300)
        })
    }

    return (
        <div className={modalClass}>
            <div className={modalContent}>
                <div className="p-6 pb-3 flex justify-end items-center">
                    <button
                        type="button"
                        onClick={() => setModal({
                            id: '',
                            page: '',
                            state: false
                        })}
                        className="w-8 h-8 flex items-center justify-center rounded bg-neutral-200 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                    </button>
                </div>
                <div className="items-center gap-8 flex-col flex p-6 pt-0 text-center overflow-auto">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="w-full text-start">
                            <label
                                htmlFor="card_name"
                                className="block mb-2 text-sm font-medium"
                            >
                                Nome da carta*
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="card_name"
                                    className="w-full h-10 border rounded px-3"
                                    placeholder=""
                                    required
                                    value={fields.name}
                                    onChange={e => setFields({
                                        ...fields,
                                        name: e.target.value
                                    })}
                                />
                                <button
                                    type="button"
                                    disabled={fields.name === '' || loadingSearch}
                                    onClick={() => searchCardByName()}
                                    className="w-12 h-10 bg-neutral-800 hover:bg-neutral-700 transition-all disabled:opacity-70 rounded flex items-center justify-center"
                                >
                                    {loadingSearch ?
                                        <svg className="w-7 h-w-7 animate-spin fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 11c.511-6.158 5.685-11 12-11s11.489 4.842 12 11h-2.009c-.506-5.046-4.793-9-9.991-9s-9.485 3.954-9.991 9h-2.009zm21.991 2c-.506 5.046-4.793 9-9.991 9s-9.485-3.954-9.991-9h-2.009c.511 6.158 5.685 11 12 11s11.489-4.842 12-11h-2.009z"/></svg>
                                    :
                                        <svg className="w-7 h-w-7 fill-white" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fillRule="nonzero"/></svg>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="w-full text-start">
                            <label
                                htmlFor="card_url"
                                className="block mb-2 text-sm font-medium"
                            >
                                URL da carta*
                            </label>
                            <input
                                type="text"
                                id="card_url"
                                className="w-full h-10 border rounded px-3"
                                placeholder=""
                                required
                                value={fields.url}
                                onChange={e => setFields({
                                    ...fields,
                                    url: e.target.value
                                })}
                                disabled={loadingSearch}
                            />
                        </div>
                    </div>
                    <div className="w-full flex gap-5">
                        <button
                            onClick={() => setFields({
                                name: '',
                                url: ''
                            })}
                            className="flex-1 flex items-center justify-center py-3 px-7 rounded-lg bg-red-600 hover:bg-red-700 transition-all text-white disabled:opacity-60 text-sm font-semibold capitalize"
                        >
                            Limpar
                        </button>
                        <button
                            onClick={() => addCard()}
                            className={`flex-1 flex items-center justify-center py-3 px-7 rounded-lg bg-neutral-600 text-white text-sm font-semibold capitalize${fields.name === '' || fields.url === '' ? ' opacity-60 pointer-events-none' : ''}`}
                        >
                            Adicionar
                        </button>
                    </div>                   
                </div>
            </div>
        </div>
    );
}