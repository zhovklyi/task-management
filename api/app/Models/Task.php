<?php

namespace App\Models;

use App\Enums\TaskPriority;
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
 * @property TaskStatus $status
 * @property TaskPriority $priority
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
        'priority',
    ];

    protected $casts = [
        'status' => TaskStatus::class,
        'priority' => TaskPriority::class,
    ];
}
