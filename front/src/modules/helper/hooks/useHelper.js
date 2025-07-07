import { useState } from "react"
import { getGroupsService } from "../services/helperService"
import { useAuth } from "../../auth/hooks/useAuth";


export const useHelper = () => {
    const { validateSession } = useAuth();
    const [groups, setGroups] = useState([])


    const getGroups = async () => {
        try {
            const result = await getGroupsService();
            setGroups(result);
        } catch (error) {
            validateSession(error)
        }
    }

    return {
        getGroups,
        groups,
    }
}