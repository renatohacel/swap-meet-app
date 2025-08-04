import { usePermissions } from "../../../auth/hooks/usePermissions";

const CheckboxInsen = ({ row, handleInsenChange }) => {
    const { can } = usePermissions();
    const canUpdateInsen = can('admin', 'update', 'capturar_insen');

    return (

        <label className={`inline-flex items-center ${canUpdateInsen ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
            <input
                type="checkbox"
                checked={!!row.insen}
                onChange={e => handleInsenChange(row.id_puesto, e.target.checked)}
                className="peer sr-only"
                disabled={!canUpdateInsen}
            />
            <span
                className={`
                                w-4 h-4
                                rounded 
                                border-2 
                                border-primary 
                                flex 
                                items-center 
                                justify-center
                                transition-all 
                                duration-200
                                peer-checked:bg-primary 
                                peer-checked:border-primary 
                                hover:bg-primary/30 
                                peer-checked:hover:bg-dark-primary
                                peer-checked:hover:border-dark-primary
                            `}
            >
                {/* Checkmark */}
                {row.insen && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </span>
        </label>
    )
}

export default CheckboxInsen