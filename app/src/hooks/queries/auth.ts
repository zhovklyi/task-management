import { register, login, getUser, logout } from "@/apis/auth";
import type { RegisterData, LoginData, AuthResponse } from "@/types/auth";
import type { User } from "@/types/user";
import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";

export function useRegisterMutation(): UseMutationResult<AuthResponse, Error, RegisterData, unknown> {
  return useMutation({
    mutationFn: async (registrationData: RegisterData) => await register(registrationData),
  })
}

export function useLoginMutation(): UseMutationResult<AuthResponse, Error, LoginData, unknown> {
  return useMutation({
    mutationFn: async (loginData: LoginData) => await login(loginData),
  })
}

export function useLogoutMutation(): UseMutationResult<void, Error, void, unknown> {
  return useMutation({
    mutationFn: async () => await logout(),
  })
}

export function useUserQuery(): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: true,
    retry: false,
  })
}
