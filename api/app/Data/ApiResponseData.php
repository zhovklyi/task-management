<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ApiResponseData extends Data
{
    public function __construct(
        public bool $success,
        public string $message,
        public mixed $data = null,
        public ?int $code = null,
    ) {}

    public static function success(mixed $data = null, string $message = 'Success', int $code = 200): self
    {
        return new self(
            success: true,
            message: $message,
            data: $data,
            code: $code
        );
    }

    public static function error(string $message = 'Error', int $code = 400, mixed $data = null): self
    {
        return new self(
            success: false,
            message: $message,
            data: $data,
            code: $code
        );
    }
}
