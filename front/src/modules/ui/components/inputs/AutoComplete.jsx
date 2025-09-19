/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";

const PAGE_SIZE = 10;

const AutoComplete = ({
    placeholder = "Buscar",
    data = [],
    fields = ["name"],
    onSelect = () => { },
    onNoMatch = () => { },
    value = "",
    onClear = () => { },
    ...props
    
}) => {
    const [searchText, setSearchText] = useState(value ?? "");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [page, setPage] = useState(0);

    const itemRefs = useRef([]);

    // Normalización
    const normalizedData =
        Array.isArray(data) && typeof data[0] !== "object"
            ? data.map((item) => ({ value: item }))
            : data;
    const normalizedFields =
        Array.isArray(data) && typeof data[0] !== "object"
            ? ["value"]
            : fields;

    // Filtrado
    const safeSearchText = typeof searchText === "string" ? searchText : "";
    const filteredData =
        safeSearchText.trim() === ""
            ? normalizedData
            : normalizedData.filter((item) =>
                normalizedFields.some((field) =>
                    item[field]
                        ?.toString()
                        .toLowerCase()
                        .includes(safeSearchText.toLowerCase())
                )
            );

    // Paginación
    const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
    const pagedData = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const handleChange = (e) => {
        setSearchText(e.target.value);
        setShowSuggestions(true);
        setHighlightedIndex(-1);
        setPage(0);
    };

    const handleSelect = (item) => {
        const valueToSet = (item[normalizedFields[0]] ?? '').toString();
        setSearchText(valueToSet);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        setPage(0);
        onSelect(item);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (highlightedIndex < pagedData.length - 1) {
                setHighlightedIndex((prev) => prev + 1);
            } else if (page < totalPages - 1) {
                setPage(page + 1);
                setHighlightedIndex(0);
            } else {
                setPage(0);
                setHighlightedIndex(0);
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (highlightedIndex > 0) {
                setHighlightedIndex((prev) => prev - 1);
            } else if (page > 0) {
                setPage(page - 1);
                setHighlightedIndex(PAGE_SIZE - 1);
            } else {
                // Ir al final de la última página
                setPage(totalPages - 1);
                setHighlightedIndex((filteredData.length - 1) % PAGE_SIZE);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && pagedData[highlightedIndex]) {
                handleSelect(pagedData[highlightedIndex]);
            } else if (pagedData.length > 0) {
                handleSelect(pagedData[0]);
            } else {
                // No hay coincidencias
                onNoMatch();
            }
        }
    };

    // También en blur
    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 10);
        // Si el texto no coincide con ningún elemento, notifica al padre
        const safeSearch = (searchText ?? '').toString();
        const match = filteredData.find(item =>
            normalizedFields.some(field =>
                (item[field]?.toString() ?? "") === safeSearch
            )
        );
        if (!match && safeSearch.trim() !== "") {
            onNoMatch();
        }
        setPage(0);
        setHighlightedIndex(-1);
    };

    useEffect(() => {
        if (
            highlightedIndex >= 0 &&
            itemRefs.current[highlightedIndex]
        ) {
            itemRefs.current[highlightedIndex].scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }, [highlightedIndex, page]);

    // Reset highlightedIndex if page or pagedData changes
    useEffect(() => {
        setHighlightedIndex(-1);
    }, [searchText]);

    // Sincroniza el valor externo con el input interno
    useEffect(() => {
        setSearchText((value ?? '').toString());
    }, [value]);

    return (
        <div className="relative md:w-auto">
            <input
                type="text"
                name="search"
                placeholder={placeholder}
                value={searchText}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="
          rounded-lg
          p-2 
          border-2 
          border-primary 
          text-primary 
          font-semibold 
          h-full 
          w-full
          overflow-x-auto 
          text-sm 
          md:text-base 
          focus:border-dark-primary 
          focus:text-dark-primary 
          focus:outline-none
          transition-all
          pr-8
          bg-white
        "
        {...props}
            />
            {searchText && (
                <button
                    type="button"
                    aria-label="Limpiar"
                    title="Limpiar"
                    onMouseDown={e => {
                        e.preventDefault();
                        setSearchText("");
                        setShowSuggestions(false);
                        setHighlightedIndex(-1);
                        setPage(0);
                        onClear(); // Notifica al padre igual que cuando no hay match
                    }}
                    className="
                    absolute
                    right-2 
                    top-1/2 
                    -translate-y-1/2 
                    text-gray-400 
                    rounded-full
                    hover:text-primary 
                    hover:bg-primary/10
                    cursor-pointer
                    focus:outline-none"
                    tabIndex={-1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l8 8M6 14L14 6" />
                    </svg>
                </button>
            )}
            {showSuggestions && pagedData.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
                    {pagedData.map((item, idx) => (
                        <li
                            key={idx}
                            ref={el => itemRefs.current[idx] = el}
                            className={`px-3 py-2 hover:bg-primary hover:text-white cursor-pointer ${idx === highlightedIndex ? "bg-primary text-white" : ""
                                }`}
                            onMouseDown={() => handleSelect(item)}
                            onMouseEnter={() => setHighlightedIndex(idx)}
                        >
                            {normalizedFields.map((f) => item[f]).join(" - ")}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;