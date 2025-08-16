<?php

namespace App\Data\Task;

use Spatie\LaravelData\Data;

class TaskFormData extends Data
{
    public function __construct(
        public string $title,
        public ?string $description,
        public int $project_id,
    ) {}

    public static function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'project_id' => ['required', 'integer', 'exists:projects,id'],
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
        ];
    }
}
