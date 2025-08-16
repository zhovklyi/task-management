<?php

namespace App\Data\Project;

use App\Models\User;
use Spatie\LaravelData\Attributes\FromAuthenticatedUser;
use Spatie\LaravelData\Data;

class ProjectsRequestData extends Data
{
    public function __construct(
        #[FromAuthenticatedUser()]
        public User $user,
    ) {}
}
