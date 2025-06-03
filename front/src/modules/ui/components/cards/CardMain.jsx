import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom"

export const CardMain = ({ children, aTerminacion = false, title = '', formTitle = '', cancelButton = false }) => {
    const location = useLocation()
    if (!cancelButton) {
        return (
            !cancelButton &&
            <section>
                <Toaster />
                <h1 className="text-primary text-2xl sm:text-3xl font-bold mb-5">
                    {title}
                </h1>
                <hr className="mb-12 text-primary/30 border-1" />
                {children}
            </section>
        )
    } else {
        return (
            <section>
                <Toaster />
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                    <h1 className="text-primary text-2xl sm:text-3xl font-bold mb-5">
                        {location.pathname.includes("/add") ? `NUEV${!aTerminacion ? 'O' : 'A'}` : location.pathname.includes("/update") ? "ACTUALIZACIÓN DE" : ''}{" "}
                        {formTitle}
                    </h1>
                    <button
                        className="outline-2 outline-primary text-primary hover:outline-none items-center px-4 
                            py-2 rounded-md hover:text-secondary-complement font-semibold cursor-pointer hover:bg-dark-primary transition-all text-sm opacity-50 hover:opacity-100 mb-10 sm:mb-0"
                        onClick={() => window.history.back()}
                    >
                        CANCELAR
                    </button>
                </div>
                <hr className="mb-12 text-primary/30 border-1" />
                {children}
            </section>
        )

    }

}
