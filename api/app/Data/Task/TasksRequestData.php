<?php

namespace App\Data\Task;

use App\Models\User;
use Spatie\LaravelData\Attributes\FromAuthenticatedUser;
use Spatie\LaravelData\Data;

class TasksRequestData extends Data
{
    public function __construct(
        #[FromAuthenticatedUser()]
        public User $user,
    ) {}
}
