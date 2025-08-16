<?php

namespace App\Data\Project;

use App\Models\User;
use Spatie\LaravelData\Attributes\FromAuthenticatedUser;
use Spatie\LaravelData\Data;

class ProjectFormData extends Data
{
    public function __construct(
        #[FromAuthenticatedUser()]
        public User $user,
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
            'name.max' => 'Name cannot exceed 255 characters',
        ];
    }
}
