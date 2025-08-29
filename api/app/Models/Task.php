<?php

namespace App\Models;

use App\Enums\TaskStatus;
use App\Models\Traits\Relations\TaskRelations;
use App\Models\Traits\Scopes\TaskScopes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property ?string $description
 * @property int $project_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Task extends Model
{
    use TaskRelations, TaskScopes;

    /** @var list<string> */
    protected $fillable = [
        'title',
        'description',
        'project_id',
        'status',
    ];

    protected $casts = [
        'status' => TaskStatus::class,
    ];
}
