import classNames from "classnames";
import { useState } from "react";

export function Modal({modal, setModal, pages, setCardsByPage}) {
    const [fields, setFields] = useState({
        name: '',
        url: ''
    })

    function addCard() {
        pages[modal.page].cards[modal.id].name = fields.name
        pages[modal.page].cards[modal.id].url = fields.url

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
                            />
                        </div>
                    </div>                        
                    <button
                        onClick={() => addCard()}
                        disabled={fields.name === '' && fields.url === ''}
                        className="w-full max-w-[200px] flex items-center justify-center py-3 px-7 rounded-lg bg-neutral-600 text-white disabled:opacity-60 text-sm font-semibold capitalize"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}