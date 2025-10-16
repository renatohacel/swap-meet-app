import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom"

export const CardMain = ({ children, aTerminacion = false, title = '', formTitle = '', cancelButton = false }) => {
    const location = useLocation()

    useEffect(() => {
        if (!cancelButton) return

        const handleEsc = (event) => {
            if (event.key === "Escape") {
                window.history.back()
            }
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [cancelButton])


    if (!cancelButton) {
        return (
            !cancelButton &&
            <section>
                <Toaster />
                <h1 className="text-primary text-2xl sm:text-3xl font-extrabold mb-5">
                    {title}
                </h1>
                <hr className="mb-12 text-primary/30 border-1" />
                {children}
            </section>
        )
    } else {
        return (
            <section>
                <Toaster position="top-center" reverseOrder={true} />

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        className="bg-primary text-secondary-complement items-center px-1 py-1 rounded-md font-semibold cursor-pointer hover:bg-dark-primary transition-all text-sm opacity-50 hover:opacity-100 mb-[18px] border-2 border-primary hover:border-dark-primary
                    "
                        onClick={() => window.history.back()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5" fill="currentColor"><path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" /></svg>
                    </button>
                    <h1 className="text-primary text-2xl sm:text-3xl font-bold mb-5">
                        {location.pathname.includes("/add") ? `NUEV${!aTerminacion ? 'O' : 'A'}` : location.pathname.includes("/update") ? "ACTUALIZACIÓN DE" : ''}{" "}
                        {formTitle}
                    </h1>
                </div>
                <hr className="mb-12 text-primary/30 border-1" />
                {children}
            </section>
        )
    }

}
