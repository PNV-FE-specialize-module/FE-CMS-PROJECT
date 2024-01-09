import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    addEmployeeApi,
    deleteEmployeeApi,
    getDetailEmployee, getManager, getTotalEmployee,
    updateEmployeeApi
} from "../api/EmployeeApi.js";
import { useTranslation } from 'react-i18next';

import {useNavigate} from "react-router";
import Swal from "sweetalert2";

export const useGetDetailEmployee = (id) => {
    const { t, i18n } = useTranslation();
    return useQuery({
        queryKey: [t("main.Employee"), id],
        queryFn: async () => {
            try {
                const { data } = await getDetailEmployee(id);
                return data;
            } catch (error) {
                console.error(t("main.Error:"), error);
                throw error;
            }
        }
    });
};
export const useCreateEmployee = () => {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(
        (newEmployee) => addEmployeeApi(newEmployee),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([t("main.Employee")]);
                navigate("/listemployee")

            },

        },
    );

    return mutation;
};

export const useUpdateEmployee = (id) => {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (params) => updateEmployeeApi(id, params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('employee');
            },
        }
    );

    return mutation;
};

export const useDeleteEmployee = () => {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient();

    const deleteEmployee = async (employeeId) => await deleteEmployeeApi(employeeId)

    return useMutation(deleteEmployee, {
        onSuccess: (data) => {
            const check = data.data.message=='Employee deletion successful'
            if(check){
                Swal.fire({
                    title: 'Success',
                    text: data.data.message,
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                })
            }
            else{
                Swal.fire({
                    title: 'Error',
                    text: data.data.message,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false
                }) 
            }
        },
    });
};
export const useGetManager = () => {
    const { t, i18n } = useTranslation();

    return useQuery([t("main.Employee")], async () => {
        const { data } = await getManager();
        return data;
    });
};

export const useGetEmployeeTotal = (params) =>
    useQuery([t("main.Employee Total"), params.period], async () => {
        const { data } = await getTotalEmployee(params);
        return data;
    });

