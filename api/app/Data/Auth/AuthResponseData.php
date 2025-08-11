<?php

namespace App\Data\Auth;

use App\Data\User\UserData;
use Spatie\LaravelData\Data;

class AuthResponseData extends Data
{
    public function __construct(
        public UserData $user,
        public string $token,
    ) {}
}
