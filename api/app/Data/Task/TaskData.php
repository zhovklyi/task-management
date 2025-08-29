<?php

namespace App\Data\Task;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use Spatie\LaravelData\Data;

class TaskData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public int $project_id,
        public TaskStatus $status,
        public TaskPriority $priority,
        public string $created_at,
        public string $updated_at,
    ) {}
}
