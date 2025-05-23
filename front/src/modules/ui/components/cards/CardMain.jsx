import { Toaster } from "react-hot-toast"
import { NavLink, useLocation } from "react-router-dom"

export const CardMain = ({ children, aTerminacion = false, title = '', formTitle = '', cancelButton = false, cancelLink = '' }) => {
    const location = useLocation()
    if (!cancelButton) {
        return (
            !cancelButton &&
            <section>
                <Toaster />
                <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
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
                    <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
                        {location.pathname.includes("/add") ? `NUEV${!aTerminacion ? 'O' : 'A'}` : location.pathname.includes("/update") ? "ACTUALIZACIÓN DE" : ''}{" "}
                        {formTitle}
                    </h1>
                    <NavLink
                        className="bg-secondary items-center p-2 rounded-md text-secondary-complement font-semibold cursor-pointer h-full hover:bg-dark-primary transition-all text-sm md:text-base opacity-50 hover:opacity-100 mb-10 sm:mb-0"
                        to={cancelLink}
                    >
                        CANCELAR
                    </NavLink>
                </div>
                <hr className="mb-12 text-primary/30 border-1" />
                {children}
            </section>
        )

    }

}
