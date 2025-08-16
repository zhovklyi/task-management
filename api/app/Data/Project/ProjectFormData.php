<?php

namespace App\Data\Project;

use Spatie\LaravelData\Data;

class ProjectFormData extends Data
{
    public function __construct(
        public string $name,
    ) {}

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
        ];
    }

    public static function messages(): array
    {
        return [
            'name' => 'Name is required',
            'name.string' => 'Name must be a valid string',
            'name.max' => 'Name cannot exceed 255 characters',
        ];
    }
}
