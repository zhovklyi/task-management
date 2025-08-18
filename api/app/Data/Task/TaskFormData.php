<?php

namespace App\Data\Task;

use App\Enums\TaskStatus;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;

class TaskFormData extends Data
{
    public function __construct(
        public string $title,
        public ?string $description,
        public int $project_id,
        #[WithCast(EnumCast::class)]
        public TaskStatus $status,
    ) {}

    public static function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'project_id' => ['required', 'integer', 'exists:projects,id'],
            'status' => ['required', 'string', 'in:' . implode(',', array_column(TaskStatus::cases(), 'value'))],
        ];
    }

    public static function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'title.string' => 'Title must be a string',
            'title.max' => 'Title cannot exceed 255 characters',
            'description.string' => 'Description must be a string',
            'description.max' => 'Description cannot exceed 1000 characters',
            'project_id.required' => 'Project is required',
            'project_id.integer' => 'Project ID must be a valid number',
            'project_id.exists' => 'Selected project does not exist',
            'status.required' => 'Status is required',
            'status.string' => 'Status must be a string',
            'status.in' => 'Status must be one of: open, in-progress, done',
        ];
    }
}
