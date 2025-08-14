<?php

namespace App\Http\Controllers;

use App\Data\ApiResponseData;
use App\Data\Auth\AuthResponseData;
use App\Data\Auth\LoginData;
use App\Data\Auth\RegisterData;
use App\Data\User\UserData;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
    ) {}

    /**
     * Register a new user
     */
    public function register(RegisterData $data): AuthResponseData
    {
        $result = $this->authService->register($data->toArray());

        return new AuthResponseData(
            user: UserData::from($result['user']),
            token: $result['token']
        );
    }

    /**
     * Login user and create token
     */
    public function login(LoginData $data): AuthResponseData
    {
        $result = $this->authService->login($data->toArray());

        return new AuthResponseData(
            user: UserData::from($result['user']),
            token: $result['token']
        );
    }

    /**
     * Logout user (Revoke the token)
     */
    public function logout(Request $request): ApiResponseData
    {
        $this->authService->logout($request->user());

        return ApiResponseData::success(
            message: 'Logged out successfully'
        );
    }

    /**
     * Get authenticated user
     */
    public function user(Request $request): UserData
    {
        return UserData::from($request->user());
    }
}
