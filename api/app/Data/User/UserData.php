<?php

namespace App\Data\User;

use Carbon\Carbon;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public ?Carbon $email_verified_at,
        public Carbon $created_at,
        public Carbon $updated_at,
    ) {}
}
