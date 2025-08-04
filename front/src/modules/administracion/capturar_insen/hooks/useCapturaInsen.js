import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { capturarInsenReducer } from "../reducers/capturaInsenReducer";
import { getInsenByIdService, updateInsenService } from "../services/capturarInsenService";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";



export const useCapturaInsen = (comerciantes, initialFormTarifa, getComerciantes, setFormState) => {
    const { validateSession } = useAuth();

    const [selectedId, setSelectedId] = useState("");
    const [selectedNombre, setSelectedNombre] = useState("");
    const [selectedDomicilio, setSelectedDomicilio] = useState("");
    const [loading, setLoading] = useState(false);

    const [insenData, dispatch] = useReducer(capturarInsenReducer, []);

    // Cuando seleccionas un ID
    const onSelectId = (item) => {
        setSelectedId(item.id);
        const found = comerciantes.find(c => c.id === item.id);
        setSelectedNombre(found ? found.nombre_completo : "");
    };

    // Cuando seleccionas un nombre
    const onSelectNombre = (item) => {
        setSelectedNombre(item.nombre_completo);
        const found = comerciantes.find(c => c.nombre_completo === item.nombre_completo);
        setSelectedId(found ? found.id : "");
    };

    const onNoMatch = () => {
        setSelectedId("");
        setSelectedNombre("");
        setSelectedDomicilio("");
        setFormState(initialFormTarifa)
        toast.error("No se encontró comerciante", {
            position: "top-right",
        });
    }
    const onClear = () => {
        setSelectedId("");
        setSelectedNombre("");
        setSelectedDomicilio("");
        setFormState(initialFormTarifa)
    }

    // Si cambia el arreglo de comerciantes, limpia los campos
    useEffect(() => {
        getComerciantes();
        onClear();
    }, []);

    useEffect(() => {
        setFormState(prevState => ({ ...prevState, id: selectedId.toString() }));
    }, [selectedId])

    // Sincroniza ambos campos y limpia si no hay coincidencia
    useEffect(() => {
        // Si ambos están vacíos, no hacer nada
        if (!selectedId && !selectedNombre) {
            onClear();
            return;
        }

        // Si hay ID, busca el nombre y domicilio
        if (selectedId) {
            const found = comerciantes.find(c => c.id === selectedId);
            if (found) {
                if (selectedNombre !== found.nombre_completo) {
                    setSelectedNombre(found.nombre_completo);
                }
                setSelectedDomicilio(found.domicilio || "");
                setFormState(prevState => ({ ...prevState, num_tarjeta: found.num_tarjeta || "" }));


                if (found.tipo_tarjeta?.split(' ')[1] === "A") {
                    setFormState(prevState => ({ ...prevState, tarifa: "A" }));
                } else if (found.tipo_tarjeta?.split(' ')[1] === "B") {
                    setFormState(prevState => ({ ...prevState, tarifa: "B" }));
                } else if (found.tipo_tarjeta?.split(' ')[1] === "C") {
                    setFormState(prevState => ({ ...prevState, tarifa: "C" }));
                } else {
                    setFormState(prevState => ({ ...prevState, tarifa: "" }));
                }

                // console.log(found)

                toast.success("Comerciante encontrado", {
                    position: "top-right",
                    duration: 1000,
                });
            } else {
                onNoMatch();
            }
        }
        // Si hay nombre, busca el ID y domicilio
        else if (selectedNombre) {
            const found = comerciantes.find(c => c.nombre_completo === selectedNombre);
            if (found) {
                if (selectedId !== found.id) {
                    setSelectedId(found.id);
                }
                setSelectedDomicilio(found.domicilio || "");
                setFormState(prevState => ({ ...prevState, num_tarjeta: found.num_tarjeta || "" }));

                if (found.tipo_tarjeta?.split(' ')[1] === "A") {
                    setFormState(prevState => ({ ...prevState, tarifa: "A" }));
                } else if (found.tipo_tarjeta?.split(' ')[1] === "B") {
                    setFormState(prevState => ({ ...prevState, tarifa: "B" }));
                } else if (found.tipo_tarjeta?.split(' ')[1] === "C") {
                    setFormState(prevState => ({ ...prevState, tarifa: "C" }));
                } else {
                    setFormState(prevState => ({ ...prevState, tarifa: "" }));
                }

                // console.log(found)

                toast.success("Comerciante encontrado", {
                    position: "top-right",
                    duration: 1000,
                });
            } else {
                onNoMatch();
            }
        }
    }, [selectedId, selectedNombre, comerciantes]);


    const getInsenById = async (id) => {
        setLoading(true);
        try {
            const response = await getInsenByIdService(id);
            dispatch({
                type: CONSTANTS.CAPTURAR_INSEN.GET_INSEN_BY_ID,
                payload: response,
            })
        } catch (error) {
            validateSession(error)
        } finally {
            setLoading(false);
        }
    }

    const updateInsenById = async (id, movimiento) => {
        try {
            const result = await updateInsenService(id, movimiento);
            toast.success(result.message, {
                position: "top-right",
                duration: 1200,
            });
        } catch (error) {
            validateSession(error);
            if (error.response?.status === 409) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                });
            }
        }
    }

    return {
        onSelectId,
        onNoMatch,
        onSelectNombre,
        onClear,
        selectedDomicilio,
        insenData,
        selectedId,
        selectedNombre,
        loading,
        getInsenById,
        updateInsenById,
    }
}
