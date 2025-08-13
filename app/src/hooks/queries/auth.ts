import { register, login, getUser } from "@/apis/auth";
import type { RegisterData, LoginData } from "@/types/auth";
import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";

export function useRegisterMutation(): UseMutationResult<any, Error, RegisterData, unknown> {
  return useMutation({
    mutationFn: async (registrationData: RegisterData) => await register(registrationData),
  })
}

export function useLoginMutation(): UseMutationResult<any, Error, LoginData, unknown> {
  return useMutation({
    mutationFn: async (loginData: LoginData) => await login(loginData),
  })
}

export function useUserQuery(): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: true,
    retry: false,
  })
}
