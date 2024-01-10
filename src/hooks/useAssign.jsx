import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { postAssignApi } from "../api/AssignApi";



export const useAssignEmployee = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (params) => postAssignApi(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["EMPLOYEE_PROJECT"]);

            },

        },
    );

    return mutation;
};