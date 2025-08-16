<?php

namespace App\Data\Project;

use Spatie\LaravelData\Data;

class ProjectData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public int $user_id,
        public string $created_at,
        public string $updated_at,
    ) {}
}
